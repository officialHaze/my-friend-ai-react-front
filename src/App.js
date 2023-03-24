import { useState, useRef } from "react";
import { speak } from "./utils/speak";
import ChatWindow from "./components/ChatWindow";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { postData } from "./utils/postData";
import "./App.css";

let userTextsArrayForASession = [];

export default function App() {
	const [inputVal, setInputVal] = useState("");
	const [messages, setMessages] = useState([]);
	const [responses, setResponses] = useState([]);
	const [stopSpeechEnabled, enableStopSpeech] = useState(false);
	const submitBtn = useRef(null);
	const synth = window.speechSynthesis;

	const disableSubmitBtn = () => {
		submitBtn.current?.setAttribute("disabled", null);
		enableStopSpeech(true);
	};

	const enableSubmitBtn = () => {
		submitBtn.current?.removeAttribute("disabled", null);
		enableStopSpeech(false);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const inputObject = {
			role: "user",
			content: inputVal,
		};
		userTextsArrayForASession.push(inputObject);
		submitBtn.current?.setAttribute("disabled", null);
		setInputVal("");
		setMessages(prevStr => {
			return [...prevStr, inputVal];
		});
		try {
			const messageFromAI = await postData(userTextsArrayForASession);
			console.log(messageFromAI);
			setResponses(prevStr => {
				return [...prevStr, messageFromAI];
			});
			speak(synth, messageFromAI, disableSubmitBtn, enableSubmitBtn);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section>
			<Header />
			<div className="main">
				<ChatWindow
					messages={messages}
					responses={responses}
				/>
				{stopSpeechEnabled && (
					<div className="stop-speech-button-container">
						<button
							onClick={() => {
								synth.cancel();
								enableSubmitBtn();
							}}>
							<i className="fa-solid fa-stop"></i> Stop speaking
						</button>
					</div>
				)}
				<form onSubmit={handleSubmit}>
					<textarea
						value={inputVal}
						onChange={e => {
							const { value } = e.target;
							setInputVal(value);
						}}
					/>
					<button
						ref={submitBtn}
						type="submit">
						<i
							className="fa-solid fa-paper-plane"
							style={{ color: "#30c1d5" }}></i>
					</button>
				</form>
			</div>
			<Footer />
		</section>
	);
}

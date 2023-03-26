import { useState, useRef } from "react";
import { speak } from "./utils/speak";
import ChatWindow from "./components/ChatWindow";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { postData } from "./utils/postData";
import Recorder from "./components/Recorder";
import "./App.css";

let userTextsArrayForASession = [];

export default function App() {
	const [inputVal, setInputVal] = useState("");
	const [messages, setMessages] = useState([]);
	const [responses, setResponses] = useState([]);
	const [stopSpeechEnabled, enableStopSpeech] = useState(false);
	const [isSpeechProcessing, setIsSpeechProcessing] = useState(false);
	const submitBtn = useRef(null);
	const synth = window.speechSynthesis;

	const disableSubmitBtn = () => {
		submitBtn.current?.setAttribute("disabled", null);
		enableStopSpeech(true);
	};

	const enableSubmitBtn = () => {
		submitBtn.current?.removeAttribute("disabled", null);
		enableStopSpeech(false);
		setIsSpeechProcessing(false);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		gettingResponseFromAI(false, inputVal);
		submitBtn.current?.setAttribute("disabled", null);
		setInputVal("");
	};

	//helper function to get responses from AI
	const gettingResponseFromAI = async (isVoiceclip, inputVal, voiceClipLink) => {
		if (isVoiceclip) {
			setMessages(prevObj => {
				return [
					...prevObj,
					{
						type: "voice-clip",
						content: voiceClipLink,
					},
				]; //setting the user voice clip link to be displayed and played on the screen
			});
		} else {
			setMessages(prevObj => {
				return [
					...prevObj,
					{
						type: "text",
						content: inputVal,
					},
				];
			}); //setting the user message to display on screen
		}

		const inputObject = {
			role: "user",
			content: inputVal,
		};
		userTextsArrayForASession.push(inputObject);
		try {
			const messageFromAI = await postData(userTextsArrayForASession);
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
						value={!isSpeechProcessing ? inputVal : ""}
						onChange={e => {
							if (!isSpeechProcessing) {
								const { value } = e.target;
								setInputVal(value);
							}
						}}
					/>
					{inputVal ? (
						<button
							ref={submitBtn}
							type="submit">
							<i
								className="fa-solid fa-paper-plane"
								style={{ color: "#30c1d5" }}></i>
						</button>
					) : (
						<Recorder
							aiResponse={gettingResponseFromAI}
							aiSpeaking={stopSpeechEnabled}
							isSpeechProcessing={setIsSpeechProcessing}
						/>
					)}
				</form>
			</div>
			<Footer />
		</section>
	);
}

import { useEffect, useState, useRef } from "react";
import { speak } from "./utils/speak";
import ChatWindow from "./components/ChatWindow";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { postData } from "./utils/postData";
import "./App.css";

export default function App() {
	const [inputVal, setInputVal] = useState("");
	const [messages, setMessages] = useState([]);
	const [responses, setResponses] = useState([]);
	// const [randNum, setRandNum] = useState();
	const submitBtn = useRef(null);
	const synth = window.speechSynthesis;

	const disableSubmitBtn = () => {
		submitBtn.current?.setAttribute("disabled", null);
	};

	const enableSubmitBtn = () => {
		submitBtn.current?.removeAttribute("disabled", null);
	};

	useEffect(() => {
		// const getDataFromServer = async () => {
		// 	try {
		// 		const messageFromAI = await postData();
		// 		console.log(messageFromAI);
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// };
		// getDataFromServer();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		// submitBtn.current?.setAttribute("disabled", null);
		setInputVal("");
		setMessages(prevStr => {
			return [...prevStr, inputVal];
		});
		try {
			const messageFromAI = await postData(inputVal);
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

// client.onmessage = e => {
// 	const synth = window.speechSynthesis;
// 	const data = JSON.parse(e.data);
// 	console.log(data);
// 	if (data.type === "user text") {
// 		setMessages(prevStr => {
// 			return [...prevStr, data.userText];
// 		});
// 	} else if (data.type === "ai response") {
// 		setResponses(prevStr => {
// 			return [...prevStr, data.message];
// 		});
// 		speak(synth, data, disableSubmitBtn, enableSubmitBtn);
// 	}
// };

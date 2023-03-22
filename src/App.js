import { useEffect, useState, useRef } from "react";
import { w3cwebsocket } from "websocket";
import { speak } from "./utils/speak";
import ChatWindow from "./components/ChatWindow";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";

export default function App() {
	const [inputVal, setInputVal] = useState("");
	const [messages, setMessages] = useState([]);
	const [responses, setResponses] = useState([]);
	const [randNum, setRandNum] = useState();
	const submitBtn = useRef(null);

	const disableSubmitBtn = () => {
		submitBtn.current?.setAttribute("disabled", null);
	};

	const enableSubmitBtn = () => {
		submitBtn.current?.removeAttribute("disabled", null);
	};

	useEffect(() => {
		const randNum = Math.floor(Math.random() * 100);
		setRandNum(randNum);
		console.log(randNum);
		const client = new w3cwebsocket(`ws://127.0.0.1:8000/ws/room/${randNum}/`);
		client.onopen = () => {
			console.log("ws connection established");
		};

		client.onmessage = e => {
			const synth = window.speechSynthesis;
			const data = JSON.parse(e.data);
			console.log(data);
			if (data.type === "user text") {
				setMessages(prevStr => {
					return [...prevStr, data.userText];
				});
			} else if (data.type === "ai response") {
				setResponses(prevStr => {
					return [...prevStr, data.message];
				});
				speak(synth, data, disableSubmitBtn, enableSubmitBtn);
			}
		};
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		submitBtn.current?.setAttribute("disabled", null);
		setInputVal("");
		const client = new w3cwebsocket(`ws://127.0.0.1:8000/ws/room/${randNum}/`);
		client.onopen = () => {
			client.send(
				JSON.stringify({
					message: inputVal,
				}),
			);
		};
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

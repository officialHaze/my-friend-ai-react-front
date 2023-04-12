import React, { useRef, useEffect, useState } from "react";
import TypingDots from "./TypingDots";
import "./chatWindow.css";
import logo from "../robot-logo.jpg";

let counter = 25;
let counterReducer;

export default function ChatWindow({ messages, responses, userDetails }) {
	const bottomMarker = useRef(null);
	const [errorInRes, setError] = useState(false);
	const [retryCounter, setRetryCounter] = useState(counter);
	const [retry, setRetry] = useState(false);
	const updatedResponses = responses.map(response => {
		let updatedRes = response;
		const idxOfNewLineSymbol = response.indexOf("\n");
		const idxOfAIPrefix = response.indexOf(":");
		if (idxOfNewLineSymbol !== -1) {
			if (idxOfAIPrefix >= 0) {
				updatedRes = response.substring(idxOfAIPrefix + 1, response.length);
			} else {
				updatedRes = response.substring(idxOfNewLineSymbol + 1, response.length);
			}
		}
		return updatedRes.replace(/\n/g, "</br>");
	});
	const [userProfilePic, setUserProfilePic] = useState("");

	//replacing all new lines with a break(<br>) in user messages
	const updatedMessages = messages.map(message => {
		if (message.type === "text") {
			return {
				...message,
				content: message.content.replace(/\n/g, "</br>"),
			};
		} else {
			return message;
		}
	});

	//clearing the counter reducer interval and resetting the retry counter
	const resetRetryCounter = () => {
		clearInterval(counterReducer);
		counter = 25;
		setRetryCounter(25);
	};

	//reset the error and retry hook and clear the reducer interval and reset retry counter on new message or response
	useEffect(() => {
		bottomMarker.current.scrollIntoView({ behaviour: "smooth" });
		resetRetryCounter();
		setError(false);
		setRetry(false);
	}, [messages, responses]);

	//wait for 27seconds before making the error state true and giving out the retry prompt
	useEffect(() => {
		setTimeout(() => {
			if (responses.length < messages.length) {
				setError(true);
				setRetry(true);
			}
		}, 35000);
	}, [messages, responses]);

	//only if error is true start the retry counter and keep reducing the counter value and updating the retry counter hook every sec
	useEffect(() => {
		if (errorInRes) {
			counterReducer = setInterval(() => {
				counter = counter - 1;
				setRetryCounter(counter);
			}, 1000);
		}
	}, [errorInRes]);

	//check the counter value on each render, and stop the timer when it reaches 0 by clearing the interval and set retry hook to false
	useEffect(() => {
		if (retryCounter === 0) {
			clearInterval(counterReducer);
			setRetry(false);
		}
	}, [retryCounter]);

	//store the user profile image address once received
	useEffect(() => {
		setUserProfilePic(userDetails.profilePic);
	}, [userDetails]);

	return (
		<div className="chat-window">
			{updatedMessages.map((msg, i) => {
				return (
					msg && (
						<div key={i}>
							{msg.type === "text" ? (
								<div className="container-wrapper">
									<div className="user-pro-img-container">
										<img
											className="user-profile-image"
											src={userProfilePic}
											alt="user-img"
										/>
									</div>
									<div className="chat-bubble">
										<div className="msg-container">
											<p dangerouslySetInnerHTML={{ __html: msg.content }} />
										</div>
									</div>
								</div>
							) : (
								<div className="audio-container-wrapper">
									<div className="user-pro-img-container">
										<img
											className="user-profile-image"
											src={userProfilePic}
											alt="user-img"
										/>
									</div>
									<div className="chat-bubble">
										<audio
											controls
											className="audio-container">
											<source
												src={msg.content}
												type="audio/mp3"
											/>
										</audio>
									</div>
								</div>
							)}
							{responses[i] ? (
								<div className="aires-container-wrapper">
									<div className="ai-pro-img-container">
										<img
											className="ai-profile-image"
											src={logo}
											alt="user-img"
										/>
									</div>
									<div className="ai-chat-bubble">
										<div className="ai-msg-container">
											<p
												dangerouslySetInnerHTML={{
													__html: updatedResponses[i],
												}}
											/>
										</div>
									</div>
								</div>
							) : (
								<div className="aires-container-wrapper">
									<div className="ai-pro-img-container">
										<img
											className="ai-profile-image"
											src={logo}
											alt="user-img"
										/>
									</div>
									<div className="ai-chat-bubble">
										<div className="ai-msg-container">
											{errorInRes ? (
												<p style={{ color: "#FA9884" }}>
													{retry
														? `Oh no ${userDetails.username} 😲! There was an error while getting a response from the server! Retrying, please wait (${retryCounter})`
														: "It feels like the server is taking a nap 😤! Refreshing the page might sometimes solve the problem. If it dosen't, please check back after sometime. Sorry for the inconvenience friend. 🙁"}
												</p>
											) : (
												<TypingDots />
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					)
				);
			})}
			<div ref={bottomMarker}></div>
		</div>
	);
}

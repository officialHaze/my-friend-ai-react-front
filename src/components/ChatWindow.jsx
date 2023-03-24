import React, { useRef, useEffect, useState } from "react";
import "./chatWindow.css";

let counter = 20;
let counterReducer;

export default function ChatWindow({ messages, responses }) {
	const bottomMarker = useRef(null);
	const [errorInRes, setError] = useState(false);
	const [retryCounter, setRetryCounter] = useState(counter);
	const [retry, setRetry] = useState(false);
	const updatedResponses = responses.map(response => {
		return response.replace(/\n/g, "</br>");
	});

	//clearing the counter reducer interval and resetting the retry counter
	const resetRetryCounter = () => {
		clearInterval(counterReducer);
		counter = 20;
		setRetryCounter(20);
	};

	//reset the error and retry hook and clear the reducer interval and reset retry counter on new message or response
	useEffect(() => {
		bottomMarker.current?.scrollIntoView({ behaviour: "smooth" });
		resetRetryCounter();
		setError(false);
		setRetry(false);
	}, [messages, responses]);

	//wait for 20seconds before making the error state true and giving out the retry prompt
	useEffect(() => {
		setTimeout(() => {
			if (responses.length < messages.length) {
				setError(true);
				setRetry(true);
			}
		}, 20000);
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

	return (
		<div className="chat-window">
			{messages.map((msg, i) => {
				return (
					msg && (
						<div key={i}>
							<div className="container-wrapper">
								<div className="msg-container">
									<p>{msg}</p>
								</div>
							</div>
							{responses[i] ? (
								<div className="aires-container-wrapper">
									<div className="ai-msg-container">
										<p
											dangerouslySetInnerHTML={{
												__html: updatedResponses[i],
											}}
										/>
									</div>
								</div>
							) : (
								<div className="aires-container-wrapper">
									<div className="ai-msg-container">
										{errorInRes ? (
											<p style={{ color: "red" }}>
												{retry
													? `Error getting response, Retrying, please wait (${retryCounter})`
													: "There was an error from the server while getting a response! Refreshing the page might sometimes solve the problem. If it dosen't please check back after sometime. Sorry for the inconvenience."}
											</p>
										) : (
											<div className="typing-animation-container">
												<div />
												<div />
												<div />
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					)
				);
			})}
			<div ref={bottomMarker} />
		</div>
	);
}

import React, { useRef, useEffect, useState } from "react";
import "./chatWindow.css";

export default function ChatWindow({ messages, responses }) {
	const bottomMarker = useRef(null);
	const [errorInRes, setError] = useState(false);
	const updatedResponses = responses.map(response => {
		return response.replace(/\n/g, "</br>");
	});

	useEffect(() => {
		bottomMarker.current?.scrollIntoView({ behaviour: "smooth" });
		setError(false);
	}, [messages, responses]);

	useEffect(() => {
		setTimeout(() => {
			if (responses.length < messages.length) {
				setError(true);
			}
		}, 5000);
	}, [messages, responses]);

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
											<p style={{ color: "red" }}>error getting response</p>
										) : (
											"..."
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

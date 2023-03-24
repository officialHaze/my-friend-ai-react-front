import React from "react";
import logo from "../logo.png";
import "./header.css";

function Header() {
	return (
		<div className="header-container">
			<img
				className="logo"
				src={logo}
				alt="speakAI-logo"
			/>
			<h1>SpeakAI</h1>
		</div>
	);
}

export default Header;

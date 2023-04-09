import React from "react";
import logo from "../robot-logo.jpg";
import "./header.css";

function Header() {
	return (
		<div className="header-container">
			<img
				className="logo"
				src={logo}
				alt="speakAI-logo"
				style={{ borderRadius: "50%"}}
			/>
			<h3>My Friend AI</h3>
		</div>
	);
}

export default Header;

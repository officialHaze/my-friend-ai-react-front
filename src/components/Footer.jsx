import React from "react";

function Footer() {
	return (
		<div
			style={{
				textAlign: "center",
				padding: "2rem",
				display: "flex",
				flexDirection: "column",
				gap: "0.5rem",
				color: "rgba(122, 122, 122, 0.7)",
			}}>
			<p>&copy; Copyright 2023</p>
			<p>Made by Moinak Dey</p>
		</div>
	);
}

export default Footer;

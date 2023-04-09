import "./LandingPage.css";
import GoogleLogin from "./GoogleLogin";
import { useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import Process from "../env";
import { GoogleOAuthProvider } from "@react-oauth/google";

const process = new Process();

export default function LandingPage({ tokenReceived }) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = e => {
		const { name, value } = e.target;

		switch (name) {
			case "username":
				setFormData(prevState => {
					return {
						...prevState,
						username: value,
					};
				});
				break;
			case "password":
				setFormData(prevState => {
					return {
						...prevState,
						password: value,
					};
				});
				break;

			default:
				break;
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setFormData({
			username: "",
			password: "",
		});
		try {
			const { data } = await axiosInstance.post("auth/token", {
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
				username: formData.username,
				password: formData.password,
				grant_type: "password",
			});
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("refresh_token", data.refresh_token);
			tokenReceived(true);
			localStorage.setItem("user_login_type", "on-site-login");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main className="landing-page">
			<div className="login-form-container">
				<div className="heading">
					<h1 style={{ textAlign: "center" }}>Login</h1>
				</div>
				<form
					onSubmit={handleSubmit}
					className="login-form">
					<div>
						<input
							onChange={handleChange}
							type="text"
							name="username"
							placeholder="Username"
							aria-placeholder="username"
							value={formData.username}
						/>
					</div>
					<div>
						<input
							onChange={handleChange}
							type="password"
							name="password"
							placeholder="Password"
							aria-placeholder="password"
							value={formData.password}
						/>
					</div>
					<div className="button-container">
						<button>Login</button>
						<div className="button-fill" />
					</div>
				</form>
				<div className="register-text">
					<p>
						Not Registered yet? <a href="/register">Register here</a>
					</p>
				</div>
				<div className="or-text-container">
					<div className="or-text">
						<p>or</p>
					</div>
					<hr />
				</div>
				<div>
					<GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
						<GoogleLogin tokenReceived={tokenReceived} />
					</GoogleOAuthProvider>
				</div>
			</div>
		</main>
	);
}

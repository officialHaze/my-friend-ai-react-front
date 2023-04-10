import "./LandingPage.css";
import GoogleLogin from "./GoogleLogin";
import { useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import Process from "../env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loader from "./Loader";

const process = new Process();

export default function LandingPage({ tokenReceived }) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [loginError, isLoginError] = useState(false);
	const [isloginInitiated, setIsLoginInitiated] = useState(false);

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
		setIsLoginInitiated(true);
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
			localStorage.setItem("user_login_type", "on-site-login");
			setIsLoginInitiated(false);
			tokenReceived(true);
		} catch (err) {
			console.log(err);
			setIsLoginInitiated(false);
			isLoginError(true);
			removeLoginError();
		}
	};

	//set timeout to remove any login error from screen
	async function removeLoginError() {
		setTimeout(() => {
			isLoginError(false);
		}, 5000);
	}

	return (
		<main className="landing-page">
			{loginError && (
				<div className="login-error-msg-container">
					<p>Error! Please check the details and login again!</p>
				</div>
			)}
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
							style={{ border: loginError && "1px solid red" }}
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
							style={{ border: loginError && "1px solid red" }}
						/>
					</div>
					{!isloginInitiated ? (
						<div className="button-container">
							<button className="login-btn">Login</button>
							<div className="button-fill" />
						</div>
					) : (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Loader />
						</div>
					)}
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

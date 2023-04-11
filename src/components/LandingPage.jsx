import "./LandingPage.css";
import GoogleLogin from "./GoogleLogin";
import { useState, useRef } from "react";
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

	// useRef
	const label_username = useRef(null);
	const label_password = useRef(null);
	const input_username = useRef(null);
	const input_password = useRef(null);

	const handleChange = e => {
		const { id, value } = e.target;

		switch (id) {
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

	//animate the input labels on focus
	const animateLabel = e => {
		const { id } = e.target;
		if (id === "username" || !id) {
			id && label_username.current?.setAttribute("class", "stay-up");
			const input_class = label_password.current?.className;
			if (formData.password !== "" && input_class === "down") {
				label_password.current?.setAttribute("class", "stay-up");
			} else if (formData.password === "" && input_class === "stay-up") {
				label_password.current?.removeAttribute("class", "stay-up");
				label_password.current?.setAttribute("class", "down");
			}
		} else if (id === "password" || !id) {
			id && label_password.current?.setAttribute("class", "stay-up");
			const input_class = label_username.current?.className;
			if (formData.username !== "" && input_class === "down") {
				label_username.current?.setAttribute("class", "stay-up");
			} else if (formData.username === "" && input_class === "stay-up") {
				label_username.current?.removeAttribute("class", "stay-up");
				label_username.current?.setAttribute("class", "down");
			}
		}
	};

	async function handleKeyDown() {
		window.onkeydown = e => {
			if (e.key === "Tab") {
				const e = {
					target: {
						id: null,
					},
				}; //setting e.target.id as null to be sent as argument to animatelabel whenever user navigates by pressinf tab key
				animateLabel(e);
			}
		};
	}

	handleKeyDown();

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
				<div className="form-wrapper">
					<form
						onSubmit={handleSubmit}
						className="login-form">
						<div className="input-container">
							<input
								ref={input_username}
								onChange={handleChange}
								type="text"
								id="username"
								aria-placeholder="username"
								value={formData.username}
								style={{ border: loginError && "1px solid red" }}
								onFocus={animateLabel}
							/>
							<div
								onClick={() => {
									input_username.current?.focus();
								}}
								id="username"
								ref={label_username}
								className="down">
								Username
							</div>
						</div>
						<div className="input-container">
							<input
								ref={input_password}
								onChange={handleChange}
								type="password"
								id="password"
								aria-placeholder="password"
								value={formData.password}
								style={{ border: loginError && "1px solid red" }}
								onFocus={animateLabel}
							/>
							<div
								onClick={() => {
									input_password.current?.focus();
								}}
								ref={label_password}
								id="password"
								className="down">
								Password
							</div>
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
							Don't have an account? <a href="/register">Register here</a>
						</p>
					</div>
					<div className="or-text-container">
						<hr className="hr-1" />
						<div className="or-text">
							<p>or</p>
						</div>
						<hr className="hr-2" />
					</div>
					<div>
						<GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
							<GoogleLogin tokenReceived={tokenReceived} />
						</GoogleOAuthProvider>
					</div>
				</div>
			</div>
		</main>
	);
}

import "./LandingPage.css";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../utils/axiosConfig";
import Process from "../env";
import { useRef } from "react";

const process = new Process();

export default function GoogleLogin({ tokenReceived }) {
	const loginBtn = useRef(null);
	const login = useGoogleLogin({
		onSuccess: tokenRes => {
			axiosInstance
				.post("auth/convert-token", {
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: "convert_token",
					backend: "google-oauth2",
					token: tokenRes.access_token,
				})
				.then(res => {
					const { data } = res;
					localStorage.setItem("access_token", data.access_token);
					localStorage.setItem("refresh_token", data.refresh_token);
					tokenReceived(true);
					loginBtn.current?.removeAttribute("disabled", null);
				})
				.catch(err => {
					console.log(err);
				});
		},
	});

	const handleGoogleLogin = () => {
		loginBtn.current?.setAttribute("disabled", null);
		login();
	};

	return (
		<div className="google-login-container">
			<div className="google-login-btn-wrapper">
				<button
					ref={loginBtn}
					className="google-login-btn"
					onClick={handleGoogleLogin}>
					Login with Google <FcGoogle className="google-logo" />
				</button>
				<div className="google-button-fill" />
			</div>
		</div>
	);
}

import "./LandingPage.css";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../utils/axiosConfig";
import Process from "../env";
import { useState } from "react";
import Loader from "./Loader";

const process = new Process();

export default function GoogleLogin({ tokenReceived }) {
	const [isloginInitiated, setIsLoginInitiated] = useState(false);
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
					setIsLoginInitiated(false);
				})
				.catch(err => {
					console.log(err);
				});
		},
	});

	const handleGoogleLogin = () => {
		setIsLoginInitiated(true);
		login();
	};

	return (
		<div className="google-login-container">
			<div
				className="google-login-btn-wrapper"
				style={{ display: "flex", justifyContent: "center" }}>
				{!isloginInitiated ? (
					<button
						className="google-login-btn"
						onClick={handleGoogleLogin}>
						Login with Google <FcGoogle className="google-logo" />
					</button>
				) : (
					<Loader />
				)}
				<div className="google-button-fill" />
			</div>
		</div>
	);
}

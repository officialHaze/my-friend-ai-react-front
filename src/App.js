import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "./utils/axiosConfig";
import Process from "./env";
import Register from "./components/Register";
import EstablishConnection from "./components/EstablishConnection";
import CreateSuperUser from "./components/CreateSuperUser";

const process = new Process();

export default function App() {
	const [serverConnectionEstablished, setServerConnectionEstablished] = useState(false);
	const [tokenReceived, setTokenReceived] = useState(false);

	useEffect(() => {
		axios
			.get("https://chatai-backend-officialhaze.onrender.com/api/server-connection/")
			.then(res => {
				console.log(res);
				setServerConnectionEstablished(true);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	//get the access and refresh token
	useEffect(() => {
		const access_token = localStorage.getItem("access_token");
		const refresh_token = localStorage.getItem("refresh_token");

		if (access_token && refresh_token) {
			setTokenReceived(true);
		} else if (refresh_token) {
			axiosInstance
				.post("auth/token", {
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: "refresh_token",
					refresh_token: refresh_token,
				})
				.then(res => {
					const { data } = res;
					localStorage.setItem("access_token", data.access_token);
					localStorage.setItem("refresh_token", data.refresh_token);
					setTokenReceived(true);
				})
				.catch(err => {
					localStorage.removeItem("refresh_token");
					localStorage.removeItem("user_login_type");
					console.log(err);
				});
		}
	}, [tokenReceived]);

	return serverConnectionEstablished ? (
		<Routes>
			<Route
				path="/"
				element={
					tokenReceived ? (
						<Dashboard tokenReceived={setTokenReceived} />
					) : (
						<LandingPage tokenReceived={setTokenReceived} />
					)
				}
			/>
			<Route
				path="/register"
				element={<Register />}
			/>
			<Route
				path={`/create-superuser/${process.env.ADMIN_SECRET}`}
				element={<CreateSuperUser />}
			/>
		</Routes>
	) : (
		<EstablishConnection />
	);
}

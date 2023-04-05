import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Process from "./env";
import Register from "./components/Register";

const process = new Process();

export default function App() {
	const [serverConnectionEstablished, setServerConnectionEstablished] = useState(false);
	const [tokenReceived, setTokenReceived] = useState(false);

	useEffect(() => {
		setTokenReceived(false); //setting the token received state to false everytime the components are rendered
		axios
			.get(process.env.SERVER_CONNECTION_URL)
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
		}
	}, [tokenReceived]);

	return serverConnectionEstablished ? (
		<Routes>
			<Route
				path="/"
				element={
					tokenReceived ? <Dashboard /> : <LandingPage tokenReceived={setTokenReceived} />
				}
			/>
			<Route
				path="/register"
				element={<Register />}
			/>
		</Routes>
	) : (
		<div>
			Establishing a secure connection with the server, please wait, this might take some time
		</div>
	);
}

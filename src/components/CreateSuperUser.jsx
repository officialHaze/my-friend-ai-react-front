import { useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import Process from "../env";

const process = new Process();

export default function CreateSuperUser() {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		password: "",
	});

	const handleChange = e => {
		const { name, value } = e.target;

		switch (name) {
			case "fname":
				setFormData(prevState => {
					return {
						...prevState,
						first_name: value,
					};
				});
				break;
			case "lname":
				setFormData(prevState => {
					return {
						...prevState,
						last_name: value,
					};
				});
				break;
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
			first_name: "",
			last_name: "",
			username: "",
			password: "",
		});
		try {
			const res = await axiosInstance.post(
				`api/user/create-superuser/${process.env.ADMIN_SECRET}/`,
				formData,
			);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main className="register-page">
			<div className="register-form-container">
				<div className="heading">
					<h1 style={{ textAlign: "center" }}>Create an account</h1>
				</div>
				<form
					onSubmit={handleSubmit}
					className="register-form">
					<div className="name-credentials">
						<div>
							<input
								onChange={handleChange}
								type="text"
								name="fname"
								placeholder="First Name"
								aria-placeholder="first name"
								value={formData.first_name}
							/>
						</div>
						<div>
							<input
								onChange={handleChange}
								type="text"
								name="lname"
								placeholder="Last Name"
								aria-placeholder="last name"
								value={formData.last_name}
							/>
						</div>
					</div>
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
					<div className="register-button-container">
						<button className="register-btn">Create Superuser</button>
						<div className="button-fill" />
					</div>
				</form>
			</div>
		</main>
	);
}

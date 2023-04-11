import "./RegisterPage.css";
import { useState, useRef } from "react";
import axiosInstance from "../utils/axiosConfig";
import Loader from "./Loader";

export default function Register() {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		password: "",
		password_again: "",
	});
	const [registrationError, isRegistrationError] = useState(false);
	const [passwordError, isPasswordError] = useState(false); //password error state
	const [isRegistrationInitiated, setIsRegistrationInitiated] = useState(false);
	const [isAccountCreated, setIsAccountCreated] = useState(false);

	// useRef labels
	const label_fname = useRef(null);
	const label_lname = useRef(null);
	const label_username = useRef(null);
	const label_password = useRef(null);
	const label_password_again = useRef(null);

	//useref inputs
	const input_fname = useRef(null);
	const input_lname = useRef(null);
	const input_username = useRef(null);
	const input_password = useRef(null);
	const input_password_again = useRef(null);

	const handleChange = e => {
		const { id, value } = e.target;

		switch (id) {
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
			case "password_again":
				setFormData(prevState => {
					return {
						...prevState,
						password_again: value,
					};
				});
				break;

			default:
				break;
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsRegistrationInitiated(true);
		setFormData({
			first_name: "",
			last_name: "",
			username: "",
			password: "",
			password_again: "",
		});

		if (formData.password !== formData.password_again) {
			isPasswordError(true);
			removeMessages();
			setIsRegistrationInitiated(false);
		} else {
			try {
				await axiosInstance.post("api/user/register/", formData);
				setIsRegistrationInitiated(false);
				setIsAccountCreated(true);
			} catch (err) {
				console.log(err);
				setIsRegistrationInitiated(false);
				isRegistrationError(true);
				removeMessages();
			}
		}
	};

	//set timeout to remove any visible messages on screen
	async function removeMessages() {
		setTimeout(() => {
			isRegistrationError(false);
			isPasswordError(false);
		}, 5000);
	}

	//animate the input labels on focus
	const animateLabel = e => {
		const { id } = e.target;
		if (id === "username" || !id) {
			id && label_username.current?.setAttribute("class", "stay-up");
			const input_class_pass = label_password.current?.className;
			const input_class_pass_again = label_password_again.current?.className;
			const input_class_fname = label_fname.current?.className;
			const input_class_lname = label_lname.current?.className;
			if (formData.password !== "" && input_class_pass === "down") {
				label_password.current?.setAttribute("class", "stay-up");
			} else if (formData.password === "" && input_class_pass === "stay-up") {
				label_password.current?.removeAttribute("class", "stay-up");
				label_password.current?.setAttribute("class", "down");
			} else if (formData.password_again !== "" && input_class_pass_again === "down") {
				label_password_again.current?.setAttribute("class", "stay-up");
			} else if (formData.password_again === "" && input_class_pass_again === "stay-up") {
				label_password_again.current?.removeAttribute("class", "stay-up");
				label_password_again.current?.setAttribute("class", "down");
			} else if (formData.first_name !== "" && input_class_fname === "down") {
				label_fname.current?.setAttribute("class", "stay-up");
			} else if (formData.first_name === "" && input_class_fname === "stay-up") {
				label_fname.current?.removeAttribute("class", "stay-up");
				label_fname.current?.setAttribute("class", "down");
			} else if (formData.last_name !== "" && input_class_lname === "down") {
				label_lname.current?.setAttribute("class", "stay-up");
			} else if (formData.last_name === "" && input_class_lname === "stay-up") {
				label_lname.current?.removeAttribute("class", "stay-up");
				label_lname.current?.setAttribute("class", "down");
			}
		} else if (id === "password" || !id) {
			id && label_password.current?.setAttribute("class", "stay-up");
			const input_class_username = label_username.current?.className;
			const input_class_pass_again = label_password_again.current?.className;
			const input_class_fname = label_fname.current?.className;
			const input_class_lname = label_lname.current?.className;
			if (formData.username !== "" && input_class_username === "down") {
				label_username.current?.setAttribute("class", "stay-up");
			} else if (formData.username === "" && input_class_username === "stay-up") {
				label_username.current?.removeAttribute("class", "stay-up");
				label_username.current?.setAttribute("class", "down");
			} else if (formData.password_again !== "" && input_class_pass_again === "down") {
				label_password_again.current?.setAttribute("class", "stay-up");
			} else if (formData.password_again === "" && input_class_pass_again === "stay-up") {
				label_password_again.current?.removeAttribute("class", "stay-up");
				label_password_again.current?.setAttribute("class", "down");
			} else if (formData.first_name !== "" && input_class_fname === "down") {
				label_fname.current?.setAttribute("class", "stay-up");
			} else if (formData.first_name === "" && input_class_fname === "stay-up") {
				label_fname.current?.removeAttribute("class", "stay-up");
				label_fname.current?.setAttribute("class", "down");
			} else if (formData.last_name !== "" && input_class_lname === "down") {
				label_lname.current?.setAttribute("class", "stay-up");
			} else if (formData.last_name === "" && input_class_lname === "stay-up") {
				label_lname.current?.removeAttribute("class", "stay-up");
				label_lname.current?.setAttribute("class", "down");
			}
		} else if (id === "password_again" || !id) {
			id && label_password_again.current?.setAttribute("class", "stay-up");
			const input_class_username = label_username.current?.className;
			const input_class_pass = label_password.current?.className;
			const input_class_fname = label_fname.current?.className;
			const input_class_lname = label_lname.current?.className;
			if (formData.username !== "" && input_class_username === "down") {
				label_username.current?.setAttribute("class", "stay-up");
			} else if (formData.username === "" && input_class_pass === "stay-up") {
				label_username.current?.removeAttribute("class", "stay-up");
				label_username.current?.setAttribute("class", "down");
			} else if (formData.password !== "" && input_class_pass === "down") {
				label_password.current?.setAttribute("class", "stay-up");
			} else if (formData.password === "" && input_class_pass === "stay-up") {
				label_password.current?.removeAttribute("class", "stay-up");
				label_password.current?.setAttribute("class", "down");
			} else if (formData.first_name !== "" && input_class_fname === "down") {
				label_fname.current?.setAttribute("class", "stay-up");
			} else if (formData.first_name === "" && input_class_fname === "stay-up") {
				label_fname.current?.removeAttribute("class", "stay-up");
				label_fname.current?.setAttribute("class", "down");
			} else if (formData.last_name !== "" && input_class_lname === "down") {
				label_lname.current?.setAttribute("class", "stay-up");
			} else if (formData.last_name === "" && input_class_lname === "stay-up") {
				label_lname.current?.removeAttribute("class", "stay-up");
				label_lname.current?.setAttribute("class", "down");
			}
		} else if (id === "fname" || !id) {
			id && label_fname.current?.setAttribute("class", "stay-up");
			const input_class_username = label_username.current?.className;
			const input_class_pass = label_password.current?.className;
			const input_class_pass_again = label_password_again.current?.className;
			const input_class_lname = label_lname.current?.className;
			if (formData.username !== "" && input_class_username === "down") {
				label_username.current?.setAttribute("class", "stay-up");
			} else if (formData.username === "" && input_class_pass === "stay-up") {
				label_username.current?.removeAttribute("class", "stay-up");
				label_username.current?.setAttribute("class", "down");
			} else if (formData.password !== "" && input_class_pass === "down") {
				label_password.current?.setAttribute("class", "stay-up");
			} else if (formData.password === "" && input_class_pass === "stay-up") {
				label_password.current?.removeAttribute("class", "stay-up");
				label_password.current?.setAttribute("class", "down");
			} else if (formData.password_again !== "" && input_class_pass_again === "down") {
				label_password_again.current?.setAttribute("class", "stay-up");
			} else if (formData.password_again === "" && input_class_pass_again === "stay-up") {
				label_password_again.current?.removeAttribute("class", "stay-up");
				label_password_again.current?.setAttribute("class", "down");
			} else if (formData.last_name !== "" && input_class_lname === "down") {
				label_lname.current?.setAttribute("class", "stay-up");
			} else if (formData.last_name === "" && input_class_lname === "stay-up") {
				label_lname.current?.removeAttribute("class", "stay-up");
				label_lname.current?.setAttribute("class", "down");
			}
		} else if (id === "lname" || !id) {
			id && label_lname.current?.setAttribute("class", "stay-up");
			const input_class_username = label_username.current?.className;
			const input_class_pass = label_password.current?.className;
			const input_class_pass_again = label_password_again.current?.className;
			const input_class_fname = label_fname.current?.className;
			if (formData.username !== "" && input_class_username === "down") {
				label_username.current?.setAttribute("class", "stay-up");
			} else if (formData.username === "" && input_class_pass === "stay-up") {
				label_username.current?.removeAttribute("class", "stay-up");
				label_username.current?.setAttribute("class", "down");
			} else if (formData.password !== "" && input_class_pass === "down") {
				label_password.current?.setAttribute("class", "stay-up");
			} else if (formData.password === "" && input_class_pass === "stay-up") {
				label_password.current?.removeAttribute("class", "stay-up");
				label_password.current?.setAttribute("class", "down");
			} else if (formData.password_again !== "" && input_class_pass_again === "down") {
				label_password_again.current?.setAttribute("class", "stay-up");
			} else if (formData.password_again === "" && input_class_pass_again === "stay-up") {
				label_password_again.current?.removeAttribute("class", "stay-up");
				label_password_again.current?.setAttribute("class", "down");
			} else if (formData.first_name !== "" && input_class_fname === "down") {
				label_fname.current?.setAttribute("class", "stay-up");
			} else if (formData.first_name === "" && input_class_fname === "stay-up") {
				label_fname.current?.removeAttribute("class", "stay-up");
				label_fname.current?.setAttribute("class", "down");
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
		<main className="register-page">
			{registrationError && (
				<div className="registration-error-msg-container">
					<p>
						Error! Please make sure you are not already registered or try a different
						username! All the fields are required to complete the registration!
					</p>
				</div>
			)}
			{passwordError && (
				<div className="registration-error-msg-container">
					<p>Error! Passwords don't match!</p>
				</div>
			)}
			{isAccountCreated && (
				<div className="account-created-msg-container">
					<p>
						Awesome! Your account has been created successfully!{" "}
						<span>
							<a
								href="/"
								style={{ color: "#2F58CD", fontWeight: "bold" }}>
								Click here
							</a>
						</span>{" "}
						to login and continue to the dashboard
					</p>
				</div>
			)}
			<div className="register-form-container">
				<div className="heading">
					<h1 style={{ textAlign: "center" }}>Create an account</h1>
				</div>
				<form
					onSubmit={handleSubmit}
					className="register-form">
					<div className="name-credentials">
						<div className="input-container">
							<input
								ref={input_fname}
								style={{ border: registrationError && "1px solid red" }}
								onChange={handleChange}
								type="text"
								id="fname"
								aria-placeholder="first name"
								value={formData.first_name}
								onFocus={animateLabel}
							/>
							<div
								onClick={() => {
									input_fname.current?.focus();
								}}
								id="fname"
								ref={label_fname}
								className="down">
								First Name
							</div>
						</div>
						<div className="input-container">
							<input
								ref={input_lname}
								style={{ border: registrationError && "1px solid red" }}
								onChange={handleChange}
								type="text"
								id="lname"
								aria-placeholder="last name"
								value={formData.last_name}
								onFocus={animateLabel}
							/>
							<div
								onClick={() => {
									input_lname.current?.focus();
								}}
								id="lname"
								ref={label_lname}
								className="down">
								Last Name
							</div>
						</div>
					</div>
					<div className="input-container">
						<input
							ref={input_username}
							style={{ border: registrationError && "1px solid red" }}
							onChange={handleChange}
							type="text"
							id="username"
							aria-placeholder="username"
							value={formData.username}
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
							style={{
								border: registrationError || (passwordError && "1px solid red"),
							}}
							onChange={handleChange}
							type="password"
							id="password"
							aria-placeholder="password"
							value={formData.password}
							onFocus={animateLabel}
						/>
						<div
							onClick={() => {
								input_password.current?.focus();
							}}
							id="password"
							ref={label_password}
							className="down">
							Password
						</div>
					</div>
					<div className="input-container">
						<input
							ref={input_password_again}
							style={{
								border: registrationError || (passwordError && "1px solid red"),
							}}
							onChange={handleChange}
							type="password"
							id="password_again"
							aria-placeholder="password again"
							value={formData.password_again}
							onFocus={animateLabel}
						/>
						<div
							onClick={() => {
								input_password_again.current?.focus();
							}}
							id="password_again"
							ref={label_password_again}
							className="down">
							Confirm Password
						</div>
					</div>
					{!isRegistrationInitiated ? (
						<div className="register-button-container">
							<button className="register-btn">Create account</button>
							<div className="button-fill" />
						</div>
					) : (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Loader />
						</div>
					)}
				</form>
			</div>
		</main>
	);
}

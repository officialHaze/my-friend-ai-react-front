import "./navbar.css";
import { useRef, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FiLogOut } from "react-icons/fi";

export default function Navbar({ userDetails, tokenReceived }) {
	const navbar = useRef(null);
	const popup = useRef(null);
	const [isNavVisible, setIsNavVisible] = useState(false);

	const hideNavbar = () => {
		navbar.current?.removeAttribute("class", "display-navbar");
		navbar.current?.setAttribute("class", "hide-navbar");
		setIsNavVisible(false);
	};

	const displayNavbar = () => {
		navbar.current?.removeAttribute("class", "hide-navbar");
		navbar.current?.setAttribute("class", "display-navbar");
		setIsNavVisible(true);
	};

	//handles logout
	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user_login_type");
		tokenReceived(false);
	};

	return (
		<>
			<div
				ref={navbar}
				className="navbar-container hide-navbar"
				onMouseLeave={hideNavbar}>
				{isNavVisible ? (
					<div className="navbar-controller">
						<SlArrowUp />
					</div>
				) : (
					<div
						className="navbar-controller"
						onMouseOver={displayNavbar}>
						<SlArrowDown />
					</div>
				)}
				<div className="navbar-contents-wrapper">
					<div className="navbar-logo">
						<h1>My Friend AI</h1>
					</div>
					<div className="img-container">
						<img
							className="user-profile-img navbar-user-img"
							style={{ width: "3.25rem", height: "3.25rem" }}
							src={userDetails.profilePic}
							alt="user"
						/>
					</div>
					<div
						ref={popup}
						className="pop-up">
						<div>
							<p>{userDetails.username}</p>
						</div>
						<div>
							<FiLogOut
								style={{ cursor: "pointer", fontSize: "1.25rem" }}
								onClick={handleLogout}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

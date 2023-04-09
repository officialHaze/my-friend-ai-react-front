import "./side-bar.css";
import { FiLogOut } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { FaSave } from "react-icons/fa";

export default function Sidebar({ userDetails, tokenReceived, setActiveView, active }) {
	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user_login_type");
		tokenReceived(false);
	};

	const handleClick = e => {
		let id = e.target.parentElement.id;
		if (!id) {
			id = e.target.parentElement.parentElement.id;
		}
		switch (id) {
			case "chat":
				setActiveView({
					chat: true,
					note: false,
					savedNotes: false,
					info: false,
				});
				break;
			case "notepad":
				setActiveView({
					chat: false,
					note: true,
					savedNotes: false,
					info: false,
				});
				break;
			case "savedNotes":
				setActiveView({
					chat: false,
					note: false,
					savedNotes: true,
					info: false,
				});
				break;
			case "info":
				setActiveView({
					chat: false,
					note: false,
					savedNotes: false,
					info: true,
				});
				break;

			default:
				break;
		}
	};

	return (
		<div className="sidebar-wrapper">
			<div>
				<div className="user-img-container-sidebar">
					<img
						className="user-profile-img-sidebar"
						src={userDetails.profilePic}
						alt="user profle"
					/>
					<div className="username-container">
						<p>{userDetails.username}</p>
					</div>
				</div>
				<div
					className="info-sidebar-container"
					id="info"
					style={{ background: active.info ? "#222222" : null }}>
					<FaInfoCircle
						className="info-icon"
						onClick={handleClick}
					/>
					{active.info && <div className="tab-highlighter" />}
				</div>
				<div
					className="chat-sidebar-container"
					id="chat"
					style={{ background: active.chat ? "#222222" : null }}>
					<AiOutlineMessage
						className="chat-icon"
						onClick={handleClick}
					/>
					{active.chat && <div className="tab-highlighter" />}
				</div>
				<div
					className="notepad-sidebar-container"
					id="notepad"
					style={{ background: active.note ? "#222222" : null }}>
					<BsPencilSquare
						className="notepad-icon"
						onClick={handleClick}
					/>
					{active.note && <div className="tab-highlighter" />}
				</div>
				<div
					className="savedNotes-sidebar-container"
					id="savedNotes"
					style={{ background: active.savedNotes ? "#222222" : null }}>
					<FaSave
						className="savedNotes-icon"
						onClick={handleClick}
					/>
					{active.savedNotes && <div className="tab-highlighter" />}
				</div>
			</div>
			<div
				className="logout-container"
				onClick={handleLogout}>
				<FiLogOut />
			</div>
		</div>
	);
}

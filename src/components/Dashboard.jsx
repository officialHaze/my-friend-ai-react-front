import { useState, useRef, useEffect } from "react";
import { speak } from "../utils/speak";
import ChatWindow from "./ChatWindow";
import Header from "./Header";
import { postData } from "../utils/postData";
import Recorder from "./Recorder";
import Sidebar from "./Sidebar";
import axiosInstance from "../utils/axiosConfig";
import Notes from "./Notes";
import SavedNotes from "./SavedNotes";
import DeleteConfirmation from "./DeleteConfirmation";
import AboutApp from "./AboutApp";
import AboutDev from "./AboutDev";
import Navbar from "./Navbar";
import "../App.css";

let userTextsArrayForASession = [];
let setTokenReceived;

export default function Dashboard({ tokenReceived }) {
	const [inputVal, setInputVal] = useState("");
	const [messages, setMessages] = useState([]);
	const [responses, setResponses] = useState([]);
	const [stopSpeechEnabled, enableStopSpeech] = useState(false);
	const [isSpeechProcessing, setIsSpeechProcessing] = useState(false);
	const [userDetails, setUserDetails] = useState({
		username: "",
		profilePic: "",
	});
	const [isNotesUpdated, setIsNotesUpdated] = useState(false);
	const [noteFormData, setNoteFormData] = useState({
		title: "",
		body: "",
	});
	const [noteDeleteTrigger, setNoteDeleteTrigger] = useState(false);
	const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState(true);

	const [activeView, setActiveView] = useState({
		chat: true,
		note: false,
		savedNotes: false,
		info: false,
	}); // for mobile screens

	const submitBtn = useRef(null);
	const synth = window.speechSynthesis;

	//screen width
	const screenWidth = window.innerWidth;

	setTokenReceived = value => {
		tokenReceived(value);
	}; //calling the tokenReceived function before directly using it inside the use effect hook

	const disableSubmitBtn = () => {
		submitBtn.current?.setAttribute("disabled", null);
		enableStopSpeech(true);
	};

	const enableSubmitBtn = () => {
		submitBtn.current?.removeAttribute("disabled", null);
		enableStopSpeech(false);
		setIsSpeechProcessing(false);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		gettingResponseFromAI(false, inputVal);
		submitBtn.current?.setAttribute("disabled", null);
		setInputVal("");
	};

	//helper function to get responses from AI
	const gettingResponseFromAI = async (isVoiceclip, inputVal, voiceClipLink) => {
		if (isVoiceclip) {
			setMessages(prevObj => {
				return [
					...prevObj,
					{
						type: "voice-clip",
						content: voiceClipLink,
					},
				]; //setting the user voice clip link to later display audio element and play it on the screen
			});
		} else {
			setMessages(prevObj => {
				return [
					...prevObj,
					{
						type: "text",
						content: inputVal,
					},
				];
			}); //setting the user message to display on screen
		}

		const inputObject = {
			role: "user",
			content: inputVal,
		};
		userTextsArrayForASession.push(inputObject);
		try {
			const messageFromAI = await postData(userTextsArrayForASession);
			setResponses(prevStr => {
				return [...prevStr, messageFromAI];
			});
			speak(synth, messageFromAI, disableSubmitBtn, enableSubmitBtn);
		} catch (err) {
			const { status } = err.response;
			console.log(status);
			if (status === 401) {
				tokenReceived(false);
			}
		}
	};

	//getting user details once logged in
	useEffect(() => {
		const access_token = localStorage.getItem("access_token");
		const user_login_type = localStorage.getItem("user_login_type");
		if (access_token && !user_login_type) {
			axiosInstance
				.get("api/user/google-details/", {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				})
				.then(res => {
					const { data } = res;
					setUserDetails({
						username: data.name,
						profilePic: data.profile_picture,
					}); //setting the user details
					localStorage.setItem("info", JSON.stringify(data));
				})
				.catch(err => {
					console.log(err);
					localStorage.removeItem("access_token");
					setTokenReceived(false);
				}); //get user google profile details
		} else if (access_token && user_login_type === "on-site-login") {
			axiosInstance
				.get("api/user/user-details/", {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				})
				.then(res => {
					const { data } = res;
					setUserDetails({
						username: data.name,
						profilePic: data.profile_picture,
					}); //setting the user details
					localStorage.setItem("info", JSON.stringify(data));
				})
				.catch(err => {
					console.log(err);
					localStorage.removeItem("access_token");
					setTokenReceived(false);
				}); //get user django profile details
		}
	}, []);

	//check the width of the screen to handle views
	useEffect(() => {
		if (screenWidth >= 600) {
			setActiveView({
				chat: true,
				note: true,
				savedNotes: true,
				info: true,
			});
		}
	}, [screenWidth]);

	//delete the note with the respective title once user confirms
	const deleteConfirmed = () => {
		const access_token = localStorage.getItem("access_token");
		axiosInstance
			.delete(`api/user/note/delete/${noteFormData.title}/`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then(res => {
				console.log(res);
				setIsNotesUpdated(true);
				setNoteDeleteTrigger(false);
				setNoteFormData({
					title: "",
					body: "",
				});
			})
			.catch(err => {
				console.log(err);
				const { status } = err.response;
				if (status === 401) {
					localStorage.removeItem("access_token");
					localStorage.getItem("user_login_type") &&
						localStorage.removeItem("user_login_type");
				}
			});
	};

	//check wether user has blocked the permission to use mic
	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then(res => {
				setHasMicrophoneAccess(true);
			})
			.catch(err => {
				setHasMicrophoneAccess(false);
			});
	}, []);

	return (
		<>
			<Navbar
				tokenReceived={tokenReceived}
				userDetails={userDetails}
			/>
			<section>
				{noteDeleteTrigger && (
					<DeleteConfirmation
						deleteConfirmed={deleteConfirmed}
						deleteNote={setNoteDeleteTrigger}
					/>
				)}
				<Sidebar
					tokenReceived={tokenReceived}
					userDetails={userDetails}
					setActiveView={setActiveView}
					active={activeView}
				/>
				<div className="dashboard">
					{activeView.chat || activeView.note || activeView.info ? (
						<div className="chat-board-container">
							<div className="notes-and-about-container">
								{activeView.note && (
									<Notes
										tokenReceived={tokenReceived}
										setIsNotesUpdated={setIsNotesUpdated}
										noteFormData={noteFormData}
										setNoteFormData={setNoteFormData}
									/>
								)}
								{activeView.info && (
									<div className="info-container">
										<AboutApp />
										<AboutDev />
									</div>
								)}
							</div>
							{activeView.chat && (
								<div className="chatheading-chatwindow-container">
									<Header />
									<div className="main">
										<ChatWindow
											messages={messages}
											responses={responses}
											userDetails={userDetails}
										/>
										{stopSpeechEnabled && (
											<div className="stop-speech-button-container">
												<button
													onClick={() => {
														synth.cancel();
														enableSubmitBtn();
													}}>
													<i className="fa-solid fa-stop"></i> Stop
													speaking
												</button>
											</div>
										)}
										<div className="chat-form-container">
											<form onSubmit={handleSubmit}>
												<textarea
													value={!isSpeechProcessing ? inputVal : ""}
													onChange={e => {
														if (!isSpeechProcessing) {
															const { value } = e.target;
															setInputVal(value);
														}
													}}
													rows={1}
													placeholder="Type a message"
												/>
												{inputVal || !hasMicrophoneAccess ? (
													<button
														className="text-btn"
														ref={submitBtn}
														type="submit">
														<i className="fa-solid fa-paper-plane"></i>
													</button>
												) : (
													<Recorder
														aiResponse={gettingResponseFromAI}
														aiSpeaking={stopSpeechEnabled}
														isSpeechProcessing={setIsSpeechProcessing}
														tokenReceived={tokenReceived}
														hasMicrophoneAccess={setHasMicrophoneAccess}
													/>
												)}
											</form>
										</div>
									</div>
								</div>
							)}
						</div>
					) : null}
					{activeView.savedNotes && (
						<SavedNotes
							setActiveView={setActiveView}
							isNotesUpdated={isNotesUpdated}
							setIsNotesUpdated={setIsNotesUpdated}
							tokenReceived={tokenReceived}
							editNote={setNoteFormData}
							deleteNoteTrigger={setNoteDeleteTrigger}
						/>
					)}
				</div>
			</section>
		</>
	);
}

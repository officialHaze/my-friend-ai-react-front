import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import NoteCards from "./NoteCards";
import { BsSearch } from "react-icons/bs";
import "./saved-notes.css";

let setTokenReceived;
let setNotesUpdated;

export default function SavedNotes({
	isNotesUpdated,
	tokenReceived,
	setIsNotesUpdated,
	editNote,
	deleteNoteTrigger,
	setActiveView,
}) {
	const [noteList, setNoteList] = useState([]);
	//setting the token value to true or false depending upon the response returned from the server
	setTokenReceived = value => {
		tokenReceived(value);
	};

	//resetting the state of note list upon succesfully getting 200 status response from server on fetching the list data
	setNotesUpdated = value => {
		setIsNotesUpdated(value);
	};

	useEffect(() => {
		const access_token = localStorage.getItem("access_token");
		axiosInstance
			.get("api/user/note/list/", {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then(res => {
				const { data } = res;
				setNoteList(data);
			})
			.catch(err => {
				const { status } = err.response;
				if (status === 401) {
					localStorage.removeItem("access-token");
					setTokenReceived(false);
				}
			});
		if (isNotesUpdated) {
			setNotesUpdated(false);
		}
	}, [isNotesUpdated]);

	const handleClick = (title, body) => {
		const screenWidth = window.innerWidth;
		editNote({
			title: title,
			body: body,
		});

		screenWidth <= 600 &&
			setActiveView({
				chat: false,
				note: true,
				savedNotes: false,
				devInfo: false,
				appInfo: false,
			});
	};

	//send to request to server on every change to initiate search and send back response
	const handleSearchOnChange = async e => {
		const access_token = localStorage.getItem("access_token");
		const { value } = e.target;
		if (value) {
			const { data } = await axiosInstance.get(`api/user/note/search/${value}/`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			console.log(data);
			setNoteList(data);
		} else {
			setNotesUpdated(true);
		}
	};

	return (
		<div className="saved-notes-container">
			<div className="search-bar-container">
				<div className="search-bar-container-wrapper">
					<div className="search-icon-container">
						<BsSearch />
					</div>
					<input
						onChange={handleSearchOnChange}
						id="search-bar"
						className="search-bar"
						type={`text`}
						placeholder="Search by Title"
					/>
				</div>
			</div>
			<div className="note-cards-container">
				{noteList &&
					noteList.map((note, index) => {
						return (
							<NoteCards
								key={index}
								title={note.title}
								body={note.body}
								created={note.created_on}
								onClick={handleClick}
								deleteNoteTrigger={deleteNoteTrigger}
							/>
						);
					})}
			</div>
		</div>
	);
}

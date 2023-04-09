import "./saved-notes.css";
import { AiFillDelete } from "react-icons/ai";

export default function NoteCards({ title, body, created, onClick, deleteNoteTrigger }) {
	let truncatedBody = body;
	let truncatedTitle = title;
	if (body.length > 50) {
		truncatedBody = body.substring(0, 50) + "...";
	}
	if (title.length > 50) {
		truncatedTitle = title.substring(0, 20) + "...";
	}
	let createdOn = new Date(created);
	createdOn = createdOn.toLocaleDateString("en-US");
	const { profile_picture } = JSON.parse(localStorage.getItem("info"));

	const handleNoteDelete = () => {
		deleteNoteTrigger(true);
	};

	return (
		<div
			className="note-card"
			onClick={() => {
				onClick(title, body);
			}}>
			<div className="note-user-img-container">
				<img
					className="note-user-img"
					src={profile_picture}
					alt="user profile"
				/>
			</div>
			<div className="note-title-body-container-wrapper">
				<div>
					<div className="note-title-container">
						<h3>{truncatedTitle}</h3>
					</div>
					<div className="note-body-container">
						<p>{truncatedBody}</p>
					</div>
				</div>
				<div className="creation-date-delete-btn">
					<p>{createdOn}</p>
					<AiFillDelete
						fontSize="1.25rem"
						onClick={handleNoteDelete}
					/>
				</div>
			</div>
		</div>
	);
}

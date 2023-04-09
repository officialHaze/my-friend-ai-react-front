import "./notes.css";
import axiosInstance from "../utils/axiosConfig";

export default function Notes({ tokenReceived, setIsNotesUpdated, noteFormData, setNoteFormData }) {
	const handleChange = e => {
		const { name, value } = e.target;
		switch (name) {
			case "title":
				setNoteFormData(prevState => {
					return {
						...prevState,
						title: value,
					};
				});
				break;
			case "body":
				setNoteFormData(prevState => {
					return {
						...prevState,
						body: value,
					};
				});
				break;

			default:
				break;
		}
	};

	const handleNoteCreateAndEdit = async () => {
		const access_token = localStorage.getItem("access_token");
		try {
			const res = await axiosInstance({
				method: "POST",
				url: "api/user/note/create-update/",
				data: noteFormData,
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			console.log(res);
			setIsNotesUpdated(true);
		} catch (err) {
			const { status } = err.response;
			console.log(status);
			if (status === 401) {
				localStorage.removeItem("access_token");
				tokenReceived(false);
			}
		}
		setNoteFormData({
			title: "",
			body: "",
		});
	};

	return (
		<div className="notes-container">
			<div className="notes-wrapper">
				<input
					onChange={handleChange}
					name="title"
					className="title"
					type={`text`}
					placeholder="Title"
					value={noteFormData.title}
				/>
				<textarea
					onChange={handleChange}
					name="body"
					className="body"
					placeholder="Write your note here"
					value={noteFormData.body}
				/>
				<button
					className="add-note-btn"
					onClick={handleNoteCreateAndEdit}>
					+
				</button>
			</div>
		</div>
	);
}

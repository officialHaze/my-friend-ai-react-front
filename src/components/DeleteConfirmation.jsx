import "./delete-confirmation.css";

export default function DeleteConfirmation({ deleteNote, deleteConfirmed }) {
	const cancelDelete = () => {
		deleteNote(false);
	};

	const handleDeleteConfirm = () => {
		deleteConfirmed();
	};

	return (
		<div className="delete-confirm-container">
			<div className="delete-confirmation-text">
				<h3>Are you sure you want to delete this note?</h3>
			</div>
			<div className="confirm-btn">
				<button
					className="yes-btn"
					onClick={handleDeleteConfirm}>
					Yes
				</button>
				<button
					className="no-btn"
					onClick={cancelDelete}>
					No
				</button>
			</div>
		</div>
	);
}

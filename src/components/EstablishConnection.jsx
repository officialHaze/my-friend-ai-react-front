import "./establish-connection.css";
import Loader from "./Loader";

export default function EstablishConnection() {
	return (
		<div className="connection-establish-main-container">
			<h2>
				Establishing a secure connection with the server, please wait, this might take some
				time.
			</h2>
				<Loader />
		</div>
	);
}

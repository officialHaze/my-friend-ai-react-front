import axios from "axios";

export async function postData(userText) {
	try {
		const res = await axios({
			method: "POST",
			url: "http://localhost:8000/api/ai-response/",
			data: {
				message: userText,
			},
		});
		return res.data.message;
	} catch (err) {
		throw err;
	}
}

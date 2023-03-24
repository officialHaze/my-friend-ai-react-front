import axios from "axios";

export async function postData(userText) {
	console.log(userText);
	try {
		const res = await axios({
			method: "POST",
			url: "http://localhost:8000/api/ai-response/",
			// url: "https://chatai-backend-officialhaze.onrender.com/api/ai-response/",
			data: {
				message: userText,
			},
		});
		return res.data.message;
	} catch (err) {
		throw err;
	}
}

import axiosInstance from "./axiosConfig";

export async function postData(userText) {
	const access_token = localStorage.getItem("access_token");
	try {
		const res = await axiosInstance({
			method: "POST",
			url: "api/ai-response/",
			data: {
				message: userText,
			},
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
		return res.data.message;
	} catch (err) {
		throw err;
	}
}

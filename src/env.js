// const baseUrl = "http://localhost:8000/api/server-connection/";
const baseUrl = "https://chatai-backend-officialhaze.onrender.com/api/server-connection/";

export default class Process {
	constructor() {
		this.env = {
			SERVER_CONNECTION_URL: baseUrl,
			CLIENT_ID: "2xSAxi8I6twhjQ6V829kBpg6JzrcuIiEUjw6yNj5",
			CLIENT_SECRET:
				"PwekaEMknVnuqecoikq8W8gG8t9XxsKDQkX6OXRb7zJq0i3HFk8iyVStGr6ad5KLdeaI4EwCrn0AjN3hqrzw75xLiWsABeQgI5jGZF0M6xpujDvfB1VuxApBUjmuf1Pt",
			GOOGLE_CLIENT_ID:
				"723407852102-l9a5r50d2pmpghq38msjso9kus05jnoc.apps.googleusercontent.com",
			GOOGLE_CLIENT_SECRET: "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",
			ADMIN_SECRET: "thisismysecretwhichisiambatmanfearmeiamthegreat",
		};
	}
}

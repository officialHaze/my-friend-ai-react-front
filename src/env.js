// const baseUrl = "http://localhost:8000/api/server-connection/";
const baseUrl = "https://chatai-backend-officialhaze.onrender.com/api/server-connection/";

const prod_client_id = "G8JiKC07Wgxcxcb1R2QXW44VF3K7E79X7nM5Vf9g";
const dev_client_id = "2xSAxi8I6twhjQ6V829kBpg6JzrcuIiEUjw6yNj5";

const prod_client_secret =
	"x5Qb8tsKKijfq2uh5hPURGE7CypgGuoV27npNR6jGQlQzPcOR2cKdFRz9Ka9154A4rtBJFO97kgSUXiO2E7F00uYZ85acsjgRFNidgOc3BLWPuIzUcsJ5pYwOXg8wBoa";
const dev_client_secret =
	"PwekaEMknVnuqecoikq8W8gG8t9XxsKDQkX6OXRb7zJq0i3HFk8iyVStGr6ad5KLdeaI4EwCrn0AjN3hqrzw75xLiWsABeQgI5jGZF0M6xpujDvfB1VuxApBUjmuf1Pt";

export default class Process {
	constructor() {
		this.env = {
			SERVER_CONNECTION_URL: baseUrl,
			CLIENT_ID: prod_client_id,
			CLIENT_SECRET: prod_client_secret,
			GOOGLE_CLIENT_ID:
				"723407852102-l9a5r50d2pmpghq38msjso9kus05jnoc.apps.googleusercontent.com",
			GOOGLE_CLIENT_SECRET: "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",
			ADMIN_SECRET: "thisismysecretwhichisiambatmanfearmeiamthegreat",
		};
	}
}

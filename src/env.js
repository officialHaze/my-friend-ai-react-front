const baseUrl = process.env.REACT_APP_CONNECTION_ESTABLISH_URL_PROD;

const prod_client_id = process.env.REACT_APP_DJANGO_APP_PROD_CLIENT_ID;
// const dev_client_id = process.env.REACT_APP_DJANGO_APP_DEV_CLIENT_ID;

const prod_client_secret = process.env.REACT_APP_DJANGO_APP_PROD_CLIENT_SECRET;
// const dev_client_secret = process.env.REACT_APP_DJANGO_APP_DEV_CLIENT_SECRET;

export default class Process {
	constructor() {
		this.env = {
			SERVER_CONNECTION_URL: baseUrl,
			CLIENT_ID: prod_client_id,
			CLIENT_SECRET: prod_client_secret,
			GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
			ADMIN_SECRET: process.env.REACT_APP_ADMIN_SECRET,
		};
	}
}

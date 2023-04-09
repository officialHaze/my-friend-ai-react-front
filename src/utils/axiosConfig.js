import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL_PROD;

const axiosInstance = axios.create({
	timeout: 100000,
});

export default axiosInstance;

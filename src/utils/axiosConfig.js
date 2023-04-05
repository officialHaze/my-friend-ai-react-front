import axios from "axios";

// const baseUrl = "http://localhost:8000/";

axios.defaults.baseURL = "http://localhost:8000/";

const axiosInstance = axios.create({
	timeout: 5000,
});

export default axiosInstance;

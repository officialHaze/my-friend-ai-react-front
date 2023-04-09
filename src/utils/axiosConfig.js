import axios from "axios";

// const baseUrl = "http://localhost:8000/";

// axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.baseURL = "https://chatai-backend-officialhaze.onrender.com/";

const axiosInstance = axios.create({
	timeout: 100000,
});

export default axiosInstance;

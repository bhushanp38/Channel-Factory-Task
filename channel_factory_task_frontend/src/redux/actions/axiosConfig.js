import axios from "axios";

// Set the base URL globally
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// set header for requests
// axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.AUTH_TOKEN}`;

export default axios;
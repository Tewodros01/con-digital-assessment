import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4600",
});

export default api;
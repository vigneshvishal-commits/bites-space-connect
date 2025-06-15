
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8020/api",
  withCredentials: true,
});

export default axiosInstance;

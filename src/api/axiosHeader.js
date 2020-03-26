import axios from "axios";

const axiosHeader = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 4000,
  headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
});

export default axiosHeader;
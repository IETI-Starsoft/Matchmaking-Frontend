import axios from "axios";

const axiosHeader = axios.create({
  baseURL: "https://matchmaking-iback.herokuapp.com/api",
  timeout: 8000,
  headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
});

export default axiosHeader;

import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "http://localhost:3000",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  // },
});

export default axiosInstance;

import Axios from "axios";
import { API_CALL_TIME_OUT } from "../Strings";

export default Axios.create({
  /**
   * Connection parameters to backend REST API
   */
  baseURL: "http://127.0.0.1:8000",
  timeout: API_CALL_TIME_OUT,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

import Axios from "axios";
import { API_CALL_TIME_OUT } from "../Strings";

const getDefaultAuthorization = () => {
  const access_token = localStorage.getItem("access_token");
  // console.log("API=========>access_token: ===========>", access_token);
  if (!!access_token) {
    return "Bearer " + access_token;
  } else return null;
};

export default Axios.create({
  /**
   * Connection parameters to backend REST API
   *
   */

  baseURL: "http://127.0.0.1:8000",
  timeout: API_CALL_TIME_OUT,
  headers: {
    Authorization: getDefaultAuthorization(),
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

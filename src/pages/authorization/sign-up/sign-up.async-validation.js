import { backendUrl } from "../../../constants/backendUrl";
import axios from "axios";

const asyncValidate = value => {
  const url = `${backendUrl}/api/users/email-validation`;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(value);
  const request = axios.post(url, body, config);

  return request
    .then(res => Promise.resolve({ email: res.data.message }))
    .catch(err => Promise.reject({ email: err.response.data.message }));
};

export default asyncValidate;

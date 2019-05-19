import { backendUrl } from "../../../constants/backendUrl";
import axios from "axios";
import store from "../../../store";

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
    .catch(err => {
      if (store.getState().authReducer.user.email !== value.email) {
        return Promise.reject({ email: err.response.data.message });
      }
    });
};

export default asyncValidate;

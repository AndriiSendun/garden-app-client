import axios from "axios";
import md5 from "md5";
import { SubmissionError } from "redux-form";

import { backendUrl } from "./../../constants/backendUrl";

import {
  REGISTRATION_FAIL,
  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  LOADING,
  REGISTERED_FALSE,
  LOGOUT_SUCCESS,
  CLEAR_MESSAGE
} from "./authorization.action-types";

import { toast } from "react-toastify";

const notify = message => toast(message);

toast.configure({
  autoClose: 4000,
  progressStyle: {
    backgroundImage: "linear-gradient(to right, #46a25f, #15d94a)"
  }
});

export const falseRegistered = () => dispatch => {
  dispatch({ type: REGISTERED_FALSE });
};

export const clearMessage = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGE });
};

export const register = ({ name, email, password }) => dispatch => {
  dispatch({ type: LOADING });
  const url = `${backendUrl}/api/users`;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  password = md5(password);
  const body = JSON.stringify({ name, email, password });

  return axios
    .post(url, body, config)
    .then(res => dispatch({ type: REGISTRATION_SUCCESS, payload: res.data }))
    .catch(err => {
      dispatch({ type: REGISTRATION_FAIL, payload: err.response.data.message });
      throw new SubmissionError({ _error: err.response.data.message });
    });
};

export const logIn = ({ email, password }) => dispatch => {
  dispatch({ type: LOADING });
  const url = `${backendUrl}/api/auth`;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  password = md5(password);
  const body = JSON.stringify({ email, password });

  return axios
    .post(url, body, config)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch(err => {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
      throw new SubmissionError({ _error: err.response.data.message });
    });
};

export const deleteUser = () => dispatch => {
  dispatch({ type: LOADING }, notify("Deleted successfully!"));
  const url = `${backendUrl}/api/auth/user`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": `${localStorage.getItem("token")}`
    }
  };

  axios
    .delete(url, config)
    .then(res => dispatch({ type: DELETE_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({ type: DELETE_FAIL, payload: err.response.data.message })
    );
};

export const updateUser = property => dispatch => {
  let body = null;
  dispatch({ type: LOADING });
  const url = `${backendUrl}/api/auth/user/${Object.keys(property)}`;

  let notify = message => toast(message);
  const objectKey = Object.keys(property)[0];
  const errorMessage = {
    email: "That email is already taken by you",
    name: "That name is already taken by you"
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    }
  };

  if (Object.keys(property)[0] === "password") {
    property.password = md5(property.password);
  }

  body = JSON.stringify(property);

  return axios
    .put(url, body, config)
    .then(res => {
      dispatch({ type: UPDATE_SUCCESS, payload: res.data });
      notify("Updated successfully!");
    })
    .catch(err => {
      dispatch({ type: UPDATE_FAIL, payload: err.response.data.message });
      if (Object.keys(errorMessage).find(el => el === objectKey)) {
        throw new SubmissionError({ _error: errorMessage[objectKey] });
      }
    });
};

export const logOut = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: "Logout success"
  });
};

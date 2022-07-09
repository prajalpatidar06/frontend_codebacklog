import {
  SET_USER,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_MESSAGE,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";

import axios from "axios";

export const signupUser = (newUserData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/users/sign_up", newUserData)
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: SET_MESSAGE, payload: res.data.message });
      } else {
        dispatch({ type: SET_ERRORS, payload: res.data.error });
      }
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    });
};

export const loginUser = (userData, Router) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/users/sign_in", userData)
    .then((res) => {
      if (res.data.success) {
        setAuthorizationHeaders(res.data.token);
        dispatch({ type: SET_USER, payload: res.data.user });
        dispatch({ type: CLEAR_ERRORS });
        Router.push("/");
      } else {
        dispatch({ type: SET_ERRORS, payload: res.data.error });
      }
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = "/";
};
export const getAuther = () => (dispatch) => {
  axios.get("users/me").then((res) => {
    console.log(res.data);
    dispatch({ type: SET_USER, payload: res.data.user });
  });
};

const setAuthorizationHeaders = (token) => {
  token = `Bearer ${token}`;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = token;
};

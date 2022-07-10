import {
  LOADING_DATA,
  SET_PROBLEMS,
  SET_PROBLEM,
  SET_AUTHPROBLEMS,
  POST_PROBLEM,
  UPDATE_PROBLEM,
  DELETE_PROBLEM,
  SET_USERS,
  SET_USERDATA,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_DATA,
  CLEAR_MESSAGE,
} from "../types";
import axios from "axios";

export const getAllProblems = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/problems")
    .then((res) => {
      dispatch({ type: SET_PROBLEMS, payload: res.data.problems });
    })
    .catch((err) => {
      dispatch({ type: SET_PROBLEMS, payload: [] });
    });
};

export const getAutherProblems = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("problems/me")
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: SET_AUTHPROBLEMS, payload: res.data.autherProblems });
      } else {
        dispatch({ type: SET_ERRORS, payload: res.data.error });
        dispatch({ type: STOP_LOADING_DATA });
      }
    })
    .catch((error) => {
      dispatch({ type: SET_ERRORS, payload: error.response.data.error });
      dispatch({ type: STOP_LOADING_DATA });
    });
};

export const getProblemById = (id) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/problems/${id}`)
    .then((res) => {
      dispatch({ type: SET_PROBLEM, payload: res.data.problem });
    })
    .catch(() => {
      dispatch({ type: SET_PROBLEM, payload: {} });
    });
};

export const createProblem = (problemData, Router) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/problems", problemData)
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: POST_PROBLEM, payload: res.data.problem });
        dispatch({ type: CLEAR_ERRORS });
        Router.push("/");
      } else {
        dispatch({ type: SET_ERRORS, payload: res.data.error });
        dispatch({ type: STOP_LOADING_DATA });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
      dispatch({ type: STOP_LOADING_DATA });
    });
};

export const clearUIData = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_MESSAGE });
};

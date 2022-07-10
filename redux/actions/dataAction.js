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
      if (res.data.success) {
        dispatch({ type: SET_PROBLEM, payload: res.data.problem });
      } else {
        dispatch({ type: SET_PROBLEM, payload: {} });
      }
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
        Router.push(`/p/${res.data.problem._id}`);
      } else {
        dispatch({ type: SET_ERRORS, payload: res.data.error });
        dispatch({ type: STOP_LOADING_DATA });
      }
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
      dispatch({ type: STOP_LOADING_DATA });
    });
};

export const clearUIData = () => (dispatch) => {
  console.log("clicked");
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_MESSAGE });
};

export const updateProblem = (id, problemData, Router) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .put(`/problems/${id}`, problemData)
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: UPDATE_PROBLEM, payload: res.data.problem });
        dispatch({ type: CLEAR_ERRORS });
        Router.push(`/p/${id}`);
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

export const deleteProblem = (id, problemData, Router) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .delete(`/problems/${id}`)
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: DELETE_PROBLEM, payload: problemData });
        dispatch({ type: CLEAR_ERRORS });
        Router.push("/");
      } else {
        dispatch({ type: SET_ERRORS, payload: res.data.error });
        dispatch({ type: STOP_LOADING_DATA });
      }
    })
    .catch((error) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
      dispatch({ type: STOP_LOADING_DATA });
    });
};

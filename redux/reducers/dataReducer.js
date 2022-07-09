import {
  LOADING_DATA,
  SET_PROBLEM,
  SET_PROBLEMS,
  SET_AUTHPROBLEMS,
  POST_PROBLEM,
  DELETE_PROBLEM,
  UPDATE_PROBLEM,
  SET_USERS,
  SET_USERDATA,
  STOP_LOADING_DATA,
} from "../types";

const initialState = {
  problems: [],
  authProblems: [],
  problem: {},
  users: [],
  userData: {},
  loading: false,
};

export default function ChangeState(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false,
      };
    case SET_PROBLEM:
      return {
        ...state,
        problem: action.payload,
        loading: false,
      };
    case SET_PROBLEMS:
      return {
        ...state,
        problems: action.payload,
        loading: false,
      };
    case SET_AUTHPROBLEMS:
      return {
        ...state,
        authProblems: action.payload,
        loading: false,
      };
    case POST_PROBLEM:
      return {
        ...state,
        problems: [action.payload, ...state.problems],
        authProblems: [action.payload, ...state.authProblems],
        loading: false,
      };
    case UPDATE_PROBLEM:
      return {
        ...state,
        problems: [action.payload, ...state.problems],
        authProblems: [action.payload, ...state.authProblems],
        loading: false,
      };
    case DELETE_PROBLEM:
      let index = state.problems.findIndex(
        (problem) => problem.id === action.payload
      );
      state.problems.splice(index, 1);
      index = state.authProblems.findIndex(
        (problem) => problem.id === action.payload
      );
      state.authProblems.splice(index, 1);
      return {
        ...state,
      };
    case SET_USERDATA:
      return {
        ...state,
        userData: action.payload,
        loading: false,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

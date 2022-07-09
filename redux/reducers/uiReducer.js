import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "../types";

const initailState = {
  loading: false,
  errors: null,
  messages: null,
};

function ChangeState(state = initailState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case SET_MESSAGE:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        messages: null,
      };
    default:
      return state;
  }
}

export default ChangeState;

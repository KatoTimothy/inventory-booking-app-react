import actionTypes from "../constants";

const {
  SET_GROUP,
  DATA_REQUEST_INNITIATED,
  DATA_REQUEST_SUCCESSFUL,
  DATA_REQUEST_FAILED,
} = actionTypes;

const bookablesReducer = (state, action) => {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case DATA_REQUEST_INNITIATED:
      return {
        ...state,
        isLoading: true,
        bookables: [],
      };
    case DATA_REQUEST_SUCCESSFUL:
      return {
        ...state,
        bookables: action.payload,
        isLoading: false,
      };
    case DATA_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        bookables: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default bookablesReducer;

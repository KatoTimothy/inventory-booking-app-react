import actionTypes from "../constants";

const {
  DATA_REQUEST_INNITIATED,
  DATA_REQUEST_SUCCESSFUL,
  DATA_REQUEST_FAILED,
} = actionTypes;

//manages state of userList component
const usersReducer = (state, action) => {
  switch (action.type) {
    case DATA_REQUEST_INNITIATED:
      return {
        ...state,
        users: [],
        isLoading: true,
        error: "",
      };
    case DATA_REQUEST_SUCCESSFUL:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: "",
      };
    case DATA_REQUEST_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default usersReducer;

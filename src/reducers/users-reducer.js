import constants from "../constants";

const {
  SET_USER_INDEX,
  FETCH_USERS_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} = constants;

//manages state of userList component
const usersReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_INDEX:
      return {
        ...state,
        userIndex: action.payload,
      };
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        users: [],
        isLoading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
  }
};

export default usersReducer;

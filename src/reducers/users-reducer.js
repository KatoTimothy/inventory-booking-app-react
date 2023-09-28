import constants from "../constants";

const {
  SET_USER_INDEX,
  FETCH_USERS_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  NEXT_USER,
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
        error: "",
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: "",
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case NEXT_USER:
      const numOfUsers = state.users.length;
      return {
        ...state,
        userIndex: (state.userIndex + 1) % numOfUsers,
      };
    default:
      return state;
  }
};

export default usersReducer;

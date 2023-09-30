import constants from "../constants";

const {
  SET_GROUP,
  SET_BOOKABLE_INDEX,
  NEXT_BOOKABLE,
  FETCH_BOOKABLES_REQUEST,
  FETCH_BOOKABLES_SUCCESS,
  FETCH_BOOKABLES_ERROR,
} = constants;

const bookablesReducer = (state, action) => {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0,
      };
    case SET_BOOKABLE_INDEX:
      return {
        ...state,
        bookableIndex: action.payload,
      };
    case NEXT_BOOKABLE:
      const bookablesInGroupCount = state.bookables.filter(
        (bookable) => bookable.group === state.group
      ).length;

      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % bookablesInGroupCount,
      };
    case FETCH_BOOKABLES_REQUEST:
      return {
        ...state,
        isLoading: true,
        bookables: [],
      };
    case FETCH_BOOKABLES_SUCCESS:
      return {
        ...state,
        bookables: action.payload,
        isLoading: false,
      };
    case FETCH_BOOKABLES_ERROR:
      return {
        ...state,
        isLoading: false,
        bookables:[],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default bookablesReducer;

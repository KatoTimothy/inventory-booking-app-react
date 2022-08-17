import constants from "../constants";

const { SET_GROUP, SET_BOOKABLE, TOGGLE_HAS_DETAILS, NEXT_BOOKABLE } =
  constants;

const bookablesReducer = (state, action) => {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
        bookableItemIndex: 0,
      };
    case SET_BOOKABLE:
      return {
        ...state,
        bookableItemIndex: action.payload,
      };

    case TOGGLE_HAS_DETAILS:
      return {
        ...state,
        hasDetails: !state.hasDetails,
      };
    case NEXT_BOOKABLE:
      const bookablesInGroupCount = state.bookables.filter(
        (bookable) => bookable.group === state.group
      ).length;

      return {
        ...state,
        bookableItemIndex:
          (state.bookableItemIndex + 1) % bookablesInGroupCount,
      };
    default:
      return state;
  }
};
export default bookablesReducer;

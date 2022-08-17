import constants from "../constants";

const { SET_GROUP, SET_BOOKABLE, NEXT_BOOKABLE, TOGGLE_HAS_DETAILS } =
  constants;

export const setGroup = (groupName) => {
  return { type: SET_GROUP, payload: groupName };
};

export const setBookable = (index) => {
  return { type: SET_BOOKABLE, payload: index };
};

export const nextBookable = () => {
  return { type: NEXT_BOOKABLE };
};

export const toggleHasDetails = () => {
  return { type: TOGGLE_HAS_DETAILS };
};

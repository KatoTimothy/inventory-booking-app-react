import constants from "../constants";

const {
  SET_GROUP,
  SET_BOOKABLE,
  NEXT_BOOKABLE,
  TOGGLE_HAS_DETAILS,
  NEXT_WEEK,
  PREVIOUS_WEEK,
  TODAY,
  SET_DATE,
  FETCH_BOOKABLES_REQUEST,
  FETCH_BOOKABLES_SUCCESS,
  FETCH_BOOKABLES_ERROR,
  SET_USER_INDEX,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
} = constants;

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

//dispatched to get next week's week object
export const nextWeek = () => {
  return {
    type: NEXT_WEEK,
  };
};

//dispatched to get previous week's week object
export const previousWeek = () => {
  return {
    type: PREVIOUS_WEEK,
  };
};

//dispatched when getting the current date
export const today = () => {
  return {
    type: TODAY,
  };
};

//dispatched when making request to fetch `bookables` data
export const fetchBookablesRequest = () => {
  return {
    type: FETCH_BOOKABLES_REQUEST,
  };
};

//dispatched when fetching `bookables` data request is successful
export const fetchBookablesSuccess = (bookables) => {
  return {
    type: FETCH_BOOKABLES_SUCCESS,
    payload: bookables,
  };
};

//dispatched when fetching `bookables` data request is unsuccesful
export const fetchBookablesError = (error) => {
  return {
    type: FETCH_BOOKABLES_ERROR,
    payload: error,
  };
};

export const setUserIndex = (index) => {
  return {
    type: SET_USER_INDEX,
    payload: index,
  };
};

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
export const fetchUsersError = (error) => {
  return {
    type: FETCH_USERS_ERROR,
    payload: error,
  };
};

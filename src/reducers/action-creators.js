import actionTypes from "../constants";

const {
  SET_GROUP,
  TOGGLE_SHOW_DETAILS,
  NEXT_WEEK,
  PREVIOUS_WEEK,
  TODAY,
  SET_DATE,
  DATA_REQUEST_INNITIATED,
  DATA_REQUEST_SUCCESSFUL,
  DATA_REQUEST_FAILED,
} = actionTypes;

export const setGroup = (groupName) => {
  return { type: SET_GROUP, payload: groupName };
};

export const toggleShowDetails = () => {
  return { type: TOGGLE_SHOW_DETAILS };
};

/**BOOKINGS */
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

//dispatched when setting a particular date
export const setDate = (date) => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

/*FOR API CALL ACTIONS*/
export const dataRequestInitiated = () => {
  return {
    type: DATA_REQUEST_INNITIATED,
  };
};

//dispatched when fetching `bookables` data request is successful
export const dataRequestSuccessful = (data) => {
  return {
    type: DATA_REQUEST_SUCCESSFUL,
    payload: data,
  };
};

//Used when fetching `bookables` data request has failed
export const dataRequestFailed = (error) => {
  return {
    type: DATA_REQUEST_FAILED,
    payload: error,
  };
};

import constants from "../constants";
const { NEXT_WEEK, PREVIOUS_WEEK, TODAY, SET_DATE } = constants;

import { getWeek } from "../utils/date-wrangler";

const weekReducer = (state, action) => {
  switch (action.type) {
    case NEXT_WEEK:
      return getWeek(state.date, 7);
    case PREVIOUS_WEEK:
      return getWeek(state.date, -7);
    case TODAY:
      return getWeek(new Date());
    case SET_DATE:
      return getWeek(new Date(action.payload));
  }
};

export default weekReducer;

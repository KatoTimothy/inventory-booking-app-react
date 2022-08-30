import { useReducer } from "react";
import weekReducer from "../../reducers/week-reducer";
import { getWeek } from "../../utils/date-wrangler";
import { nextWeek, previousWeek, today } from "../../reducers/action-creators";
import { FaChevronLeft, FaCalendarDay, FaChevronRight } from "react-icons/fa";

const WeekPicker = ({ date }) => {
  const [week, dispatch] = useReducer(weekReducer, date, getWeek);

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch(previousWeek())}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch(today())}>
          <FaCalendarDay />
          <span>Today</span>
        </button>
        <button className="btn" onClick={() => dispatch(nextWeek())}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
};

export default WeekPicker;

import { useReducer, useRef } from "react";
import weekReducer from "../../reducers/week-reducer";
import { getWeek } from "../../utils/date-wrangler";
import {
  nextWeek,
  previousWeek,
  today,
  setDate,
} from "../../reducers/action-creators";
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";

const WeekPicker = ({ date }) => {
  const [week, dispatch] = useReducer(weekReducer, date, getWeek);
  const textBoxRef = useRef();

  const goToDate = () => {
    dispatch(setDate(textBoxRef.current.value));
  };

  return (
    <div>
      <p className="date-picker">
        {/* previous button */}
        <button className="btn" onClick={() => dispatch(previousWeek())}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        {/* Today button */}
        <button className="btn" onClick={() => dispatch(today())}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        {/* Date text input */}
        <span>
          <input
            type="text"
            defaultValue="2022-09-04"
            placeholder="2022-09-21"
            ref={textBoxRef}
          />
        </span>
        {/* Go button */}
        <button className="btn go" onClick={goToDate}>
          <FaCalendarCheck />
          <span>Go</span>
        </button>

        {/* Next button */}
        <button className="btn" onClick={() => dispatch(nextWeek())}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>

      {/* start to end week date strings */}
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
};

export default WeekPicker;

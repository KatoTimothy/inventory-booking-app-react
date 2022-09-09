import { useReducer, useState } from "react";

import weekReducer from "../../reducers/week-reducer";
import { getWeek } from "../../utils/date-wrangler";

//import components
import WeekPicker from "./WeekPicker";
import BookingsGrid from "./BookingsGrid";
import BookingsDetails from "./BookingsDetails";

const Bookings = ({ bookable }) => {
  /**Manage states */
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);

  const [booking, setBooking] = useState(null);

  /**UI */
  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch} />
        <BookingsGrid
          week={week}
          booking={booking}
          setBooking={setBooking}
          set
        />
      </div>
      <BookingsDetails booking={booking} bookable={bookable} />
    </div>
  );
};

export default Bookings;

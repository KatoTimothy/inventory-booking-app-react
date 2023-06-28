import { useEffect, useMemo, useState } from "react";
import { getBookings } from "../../utils/api";
import Spinner from "../UI/Spinner";
import { getGrid, transformBookings } from "./grid-builder";

const BookingsGrid = ({ week, bookable, booking, setBooking }) => {
  //manage state
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(false);

  const { grid, sessions, dates } = useMemo(
    () => (bookable ? getGrid(bookable, week.start) : {}),
    [bookable, week.start]
  );

  //fetches bookings
  //effect runs when the bookable or week changes
  useEffect(() => {
    //flag matches each request with its data
    let doUpdate = true;

    if (bookable) {
      setBooking(null);
      setError(false);
      setBookings(null);

      //fetch booking data
      getBookings(bookable.id, week.start, week.end)
        .then((res) => {
          if (doUpdate) {
            setBookings(transformBookings(res));
          }
        })
        .catch((err) => setError(err));
    }

    return () => (doUpdate = false);
  }, [bookable, week, setBooking]);

  //UI helper
  function cell(session, date) {
    const cellData = bookings?.[session]?.[date] || grid[session][date];

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : null}
        onClick={bookings ? () => setBooking(cellData) : null}
      >
        {cellData.title}
      </td>
    );
  }

  //UI
  if (!grid) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}

      <table className={bookings ? "bookingsGrid active" : "bookingsGrid"}>
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner />
              </span> 
            </th>
            {dates.map((date) => (
              <th key={date}>{new Date(date).toDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BookingsGrid;

import { sessions as sessionNames } from "../../static.json";
import { shiftDate, shortISO } from "../../utils/date-wrangler";

//generates a grid of sessions and dates
export const getGrid = (bookable, startDate) => {
  //list of dates of a bookable
  const dates = bookable.days
    .sort()
    .map((dayIndex) => shortISO(shiftDate(startDate, dayIndex)));

  //list of session names of a bookable
  const sessions = bookable.sessions.map(
    (sessionIndex) => sessionNames[sessionIndex]
  );

  const grid = {};

  sessions.forEach((session) => {
    grid[session] = {};

    dates.forEach((date) => {
      grid[session][date] = {
        session,
        date,
        bookableId: bookable.id,
        title: "",
      };
    });
  });

  return {
    grid,
    dates,
    sessions,
  };
};

//transforms bookings data into a handy lookup object
const transformBookings = (bookingsArray) => {
  return bookingsArray.reduce((bookings, booking) => {
    const { session, date } = booking;
    if (!bookings[session]) {
      bookings[session] = {};
    }
    bookings[session][date] = booking;
    return bookings;
  });
};

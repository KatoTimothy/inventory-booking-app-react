import staticData from "../../static.json";
import { shiftDate, shortISO } from "../../utils/date-wrangler";

const { sessions } = staticData

//generates data to be displayed in the
//grid based on the selected bookable selected
export const getGrid = (bookable, startDate) => {
  //list of dates of a bookable
  const dates = bookable.days
    .sort()
    .map((dayIndex) => shortISO(shiftDate(startDate, dayIndex)));

  //list of session names of a bookable
  const sessionNames = bookable.sessions.map(
    (sessionIndex) => sessions[sessionIndex]
  );

  const grid = {};

  sessionNames.forEach((session) => {
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
    sessions: sessionNames,
    dates,
  };
};

//transforms bookings data into a handy lookup object
export const transformBookings = (bookingsArray) => {
  return bookingsArray.reduce((bookings, booking) => {
    const { session, date } = booking;
    if (!bookings[session]) {
      bookings[session] = {};
    }
    bookings[session][date] = booking;
    return bookings;
  }, {});
};

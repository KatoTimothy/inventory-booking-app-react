import { sessions as sessionNames } from "../../static.json";
import { shiftDate, shortISO } from "../../utils/date-wrangler";

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

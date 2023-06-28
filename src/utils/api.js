import { shortISO } from "./date-wrangler";

export const getBookings = (bookableId, startDate, endDate) => {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const query = `bookableId=${bookableId}`;

  //FETCH bookings from
  //'htttp://localhost:3001/bookings/bookableId=1&date_gte=2022-06-21&date_lte=2022-06-27
  return getData(`${urlRoot}?${query}`);
};

const getData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("There was a problem fetching data.");
  }
  return await res.json();
};

export default getData;

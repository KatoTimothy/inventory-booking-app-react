import { useState } from "react";

//import components
import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";

const BookingsPage = () => {
  /**Manage state */
  const [bookable, setBookable] = useState(null);

  /**UI */
  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  );
};

export default BookingsPage;

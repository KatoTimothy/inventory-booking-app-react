import { useState } from "react";

import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";

const BookingsPage = () => {
  const [bookable, setBookable] = useState(null);

  return (
    <main className="bookings-page">
      <Bookings bookable={bookable} />
    </main>
  );
};

export default BookingsPage;

import React, { useState } from "react";

import BookablesList from "./BookablesList";
import BookableDetails from "./BookablesDetails";

export const BookablesPage = () => {
  const [bookable, setBookable] = useState(null);
  return (
    <main className="bookables-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <BookableDetails bookable={bookable} />
    </main>
  );
};

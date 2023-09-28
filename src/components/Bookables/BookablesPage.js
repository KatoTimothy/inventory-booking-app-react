import React, { useState } from "react";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookablesDetails";

export const BookablesPage = () => {
  const [bookable, setBookable] = useState();
  return (
    <main className="bookables-page">
      <BookablesList setBookable={setBookable} />
      <BookableDetails bookable={bookable} />
    </main>
  );
};

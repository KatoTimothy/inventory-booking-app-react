import { useState } from "react";

//import components
import BookableDetails from "./BookablesDetails";
import BookablesList from "./BookablesList";

// BookablesView component
const BookablesView = () => {
  /**variables */
  const [bookable, setBookable] = useState();

  /**UI */
  return (
    <>
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <BookableDetails bookable={bookable} />
    </>
  );
};

export default BookablesView;

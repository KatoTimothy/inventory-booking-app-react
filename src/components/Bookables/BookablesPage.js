import React, { useReducer, useState } from "react";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookablesDetails";

//reducer to manage component state with actions
import bookablesReducer from "../../reducers/bookables-reducer";

//initial state for the reducer
const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  bookables: [],
  isLoading: true,
  hasDetails: true,
  error: "",
};

export const BookablesPage = () => {
  const [bookable, setBookable] = useState();
  const [state, dispatch] = useReducer(bookablesReducer, initialState);
  return (
    <main className="bookables-page">
      <BookablesList
        setBookable={setBookable}
        state={state}
        dispatch={dispatch}
      />
      <BookableDetails
        bookable={bookable}
        hasDetails={state.hasDetails}
        dispatch={dispatch}
      />
    </main>
  );
};

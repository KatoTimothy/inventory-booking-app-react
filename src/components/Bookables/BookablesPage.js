import React, { useReducer, useState, useEffect } from "react";
import Spinner from "../UI/Spinner";

import BookablesList from "./BookablesList";
import BookableDetails from "./BookablesDetails";

import getData from "../../utils/api";

//reducer to manage component state with actions
import bookablesReducer from "../../reducers/bookables-reducer";

//Action creator functions
//that return actions used to update component state
import {
  fetchBookablesRequest,
  fetchBookablesSuccess,
  fetchBookablesError,
} from "../../reducers/action-creators";

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
  const [bookable, setBookable] = useState(null);
  const [state, dispatch] = useReducer(bookablesReducer, initialState);
  const { isLoading, error, hasDetails, bookables } = state;

  //Loads bookables data only once:when the component mounts
  useEffect(() => {
    //url containing bookables data
    const url = "http://localhost:3001/bookables";

    async function fetchData(dataUrl) {
      try {
        dispatch(fetchBookablesRequest());
        const data = await getData(dataUrl);
        dispatch(fetchBookablesSuccess(data));
      } catch (error) {
        dispatch(fetchBookablesError(error.message));
      }
    }
    fetchData(url);
  }, []);

  /**UI */
  //loading spinner renders if data hasn't arrived
  if (isLoading) {
    return (
      <main>
        <p>
          <Spinner /> Loading bookables
        </p>
      </main>
    );
  }
  //error page displays if error occurs during data fetch
  if (error) {
    return (
      <main>
        <p className="bookingsError">{error}</p>
      </main>
    );
  }

  return (
    <main className="bookables-page">
      <BookablesList
        setBookable={setBookable}
        state={state}
        dispatch={dispatch}
      />
      <BookableDetails
        bookable={bookable}
        hasDetails={hasDetails}
        dispatch={dispatch}
      />
    </main>
  );
};

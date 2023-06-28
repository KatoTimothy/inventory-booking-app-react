import { useEffect, useReducer, useState } from "react";

// import components
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";

// import data
import data from "../../static.json";

import bookablesReducer from "../../reducers/bookables-reducer";
import {
  fetchBookablesRequest,
  fetchBookablesSuccess,
  fetchBookablesError,
  setBookable,
  nextBookable,
  setGroup,
  toggleShowDetails,
} from "../../reducers/action-creators";
//fetches remote data
import getData from "../../utils/api";
import BookableDetails from "./BookablesDetails";

const { days } = data;
const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  showDetails: true,
  bookables: [],
  isLoading: true,
  error: "",
};
// BookablesList component
const BookablesList = () => {
  const [store, dispatch] = useReducer(bookablesReducer, initialState);
  /**Variables */
  const { group, bookableIndex, bookables } = store;
  const { showDetails, isLoading, error } = store;

  //List of bookable items in group
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const bookable = bookables[bookableIndex];

  //List of all group names of bookables
  const groups = [...new Set(bookables.map((b) => b.group))];

  /**effects */
  useEffect(() => {
    dispatch(fetchBookablesRequest());
    getData("http://localhost:3001/bookables")
      .then((data) => {
        dispatch(fetchBookablesSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchBookablesError(error.message));
      });
  }, []);

  /**event handler functions */
  //called when user clicks on a bookable
  function changeBookable(index) {
    dispatch(setBookable(index));
  }

  //called when user clicks `Next` button
  function changeNextBookable() {
    dispatch(nextBookable());
  }

  //called when user selects group from selectbox
  function changeGroup(group) {
    dispatch(setGroup(group));
  }
  //show details
  function handleShowdetails() {
    dispatch(toggleShowDetails());
  }
  /**UI */
  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading bookables
      </p>
    );
  }
  return (
    <>
      <div>
        {/* groups dropdown menu */}
        <select
          name="group"
          value={group}
          onChange={(e) => changeGroup(e.target.value)}
        >
          {groups.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        {/* Bookables list */}
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === bookableIndex ? "selected" : null}>
              <button className="btn" onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        {/* Next button */}
        <p>
          <button className="btn" onClick={changeNextBookable}>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>

              {/* details section */}
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleShowdetails(e.target.value)}
                    checked={showDetails}
                  />
                  Show details
                </label>
              </span>
            </div>
            <p>{bookable.notes}</p>

            {showDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((day, index) => (
                      <li key={index}> {days[day]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookablesList;

import { useEffect, useReducer, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";

import data from "../../static.json";
import bookablesReducer from "../../reducers/bookables-reducer";
import getData from "../../utils/api";

import {
  setGroup,
  nextBookable,
  setBookable,
  toggleHasDetails,
  fetchBookablesSuccess,
  fetchBookablesError,
  fetchBookablesRequest,
} from "../../reducers/action-creators";

const { sessions, days } = data;

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: null,
};
const BookablesList = () => {
  const [state, dispatch] = useReducer(bookablesReducer, initialState);

  // window.state = state;

  const { group, bookableIndex, bookables, hasDetails, isLoading, error } =
    state;

  //reference to `Next` Button
  const nextButtonRef = useRef();

  //unique collection of bookable group names
  const groups = [...new Set(bookables.map((b) => b.group))];

  //collection of bookables in selected group
  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );

  const selectedBookable = bookablesInGroup[bookableIndex];

  const changeBookable = (selectedIndex) => {
    dispatch(setBookable(selectedIndex));
    nextButtonRef.current.focus();
  };

  const changeNextBookable = () => {
    dispatch(nextBookable());
  };

  const changeGroup = (groupName) => {
    dispatch(setGroup(groupName));
  };

  const toggleDetails = () => {
    dispatch(toggleHasDetails());
  };

  // effects
  useEffect(() => {
    dispatch(fetchBookablesRequest());

    getData("http://localhost:3001/bookables")
      .then((bookableData) => {
        dispatch(fetchBookablesSuccess(bookableData));
      })
      .catch((error) => {
        dispatch(fetchBookablesError(error.message));
      });
  }, []);

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
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        {/* Bookables list */}
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((bookableItem, index) => (
            <li
              key={bookableItem.id}
              className={index === bookableIndex ? "selected" : null}
            >
              <button className="btn" onClick={() => changeBookable(index)}>
                {bookableItem.title}
              </button>
            </li>
          ))}
        </ul>
        {/* Next button */}
        <p>
          <button
            className="btn"
            onClick={changeNextBookable}
            autoFocus
            ref={nextButtonRef}
          >
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {/* Bookables details page */}
      {selectedBookable && (
        <div className="item">
          <div className="item-header">
            <h2>{selectedBookable.title}</h2>
            <span className="controls">
              {/* show details checkbox */}
              <label>
                <input
                  type="checkbox"
                  checked={hasDetails}
                  onChange={toggleDetails}
                />
                Show details
              </label>
            </span>
          </div>
          <p>{selectedBookable.notes}</p>

          {/* bookables details */}
          {hasDetails && (
            <div className="item-details">
              <h3>Availability</h3>
              <div className="bookable-availability">
                <ul>
                  {selectedBookable.days.sort().map((dayNumber) => (
                    <li key={dayNumber}>{days[dayNumber]}</li>
                  ))}
                </ul>
                <ul>
                  {selectedBookable.sessions.map((sessionNumber) => (
                    <li key={sessionNumber}>{sessions[sessionNumber]}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BookablesList;

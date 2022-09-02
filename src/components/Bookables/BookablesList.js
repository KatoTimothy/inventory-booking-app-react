import { useEffect, useReducer } from "react";
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
  bookableItemIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: "",
};

const BookablesList = () => {
  const [state, dispatch] = useReducer(bookablesReducer, initialState);

  const { group, bookableItemIndex, bookables, hasDetails, isLoading, error } =
    state;

  //unique collection of bookable group names
  const groups = [...new Set(bookables.map((b) => b.group))];

  //collection of bookables in selected group
  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );

  const selectedBookable = bookablesInGroup[bookableItemIndex];

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
        <select
          name="group"
          value={group}
          onChange={(e) => dispatch(setGroup(e.target.value))}
        >
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((bookableItem, index) => (
            <li
              key={bookableItem.id}
              className={index === bookableItemIndex ? "selected" : null}
            >
              <button
                className="btn"
                onClick={() => dispatch(setBookable(index))}
              >
                {bookableItem.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button
            className="btn"
            onClick={() => dispatch(nextBookable())}
            autoFocus
          >
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {selectedBookable && (
        <div className="item">
          <div className="item-header">
            <h2>{selectedBookable.title}</h2>
            <span className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={hasDetails}
                  onChange={() => dispatch(toggleHasDetails())}
                />
                Show details
              </label>
            </span>
          </div>
          <p>{selectedBookable.notes}</p>

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

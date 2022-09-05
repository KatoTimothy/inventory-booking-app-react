import { useEffect, useRef } from "react";

// import components
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";

//fetches remote data
import getData from "../../utils/api";

// import action creators
import {
  setGroup,
  nextBookable,
  setBookable,
  fetchBookablesSuccess,
  fetchBookablesError,
  fetchBookablesRequest,
} from "../../reducers/action-creators";

// BookablesList component
const BookablesList = ({ state, dispatch }) => {
  //reference to `Next` Button
  const nextButtonRef = useRef();

  const { bookables, group, error, bookableIndex, isLoading } = state;

  //List of group names of bookables
  const groups = [...new Set(bookables.map((b) => b.group))];

  //List of bookable items in selected group
  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );

  // event handlers
  const changeBookable = (index) => {
    dispatch(setBookable(index));
    nextButtonRef.current.focus();
  };

  const changeNextBookable = () => {
    dispatch(nextBookable());
  };

  const changeGroup = (groupName) => {
    dispatch(setGroup(groupName));
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
  }, [dispatch]);

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
    </>
  );
};

export default BookablesList;

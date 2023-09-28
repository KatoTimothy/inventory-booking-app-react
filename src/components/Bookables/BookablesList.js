import { useEffect, useReducer } from "react";

import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";

import getData from "../../utils/api";

//reducer to manage component state with actions
import bookablesReducer from "../../reducers/bookables-reducer";

//Action creator functions
//that return actions used to update component state
import {
  fetchBookablesRequest,
  fetchBookablesSuccess,
  fetchBookablesError,
  nextBookable,
  setGroup,
  setBookableIndex,
} from "../../reducers/action-creators";

//initial state for the reducer
const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  bookables: [],
  isLoading: true,
  error: "",
};

const BookablesList = ({ setBookable }) => {
  const [state, dispatch] = useReducer(bookablesReducer, initialState);

  const { group, bookableIndex, bookables, isLoading, error } = state;
  //setBookable
  //List of all group names bookables belong to
  const groups = [...new Set(bookables.map((b) => b.group))];

  //List of bookables in current group
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  setBookable(bookablesInGroup[bookableIndex]);

  /**event handler functions */
  function onChangeBookable(index) {
    dispatch(setBookableIndex(index));
    setBookable(bookablesInGroup[index]);
  }

  function onClickNextButton() {
    dispatch(nextBookable());
  }

  function onChangeGroup(group) {
    dispatch(setGroup(group));
  }

  /**effects */

  //Loads bookables data only once: when the component mounts
  useEffect(() => {
    dispatch(fetchBookablesRequest());
    getData("http://localhost:3001/bookables")
      .then((data) => {
        dispatch(fetchBookablesSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchBookablesError(error));
      });
  }, []);

  /**UI */
  if (error) {
    return <p>{error}</p>;
  }

  //display loading UI (spinner) if data hasn't arrived
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
        {/* groups selector */}
        <select
          name="group"
          value={group}
          onChange={(e) => onChangeGroup(e.target.value)}
        >
          {groups.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

        {/* Bookables list in the current group */}
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === bookableIndex ? "selected" : null}>
              <button className="btn" onClick={() => onChangeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Next button */}
        <p>
          <button className="btn" onClick={onClickNextButton}>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
    </>
  );
};

export default BookablesList;

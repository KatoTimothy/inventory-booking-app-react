import { useEffect, useReducer } from "react";
import { FaArrowRight } from "react-icons/fa";

import Spinner from "../UI/Spinner";

import getData from "../../utils/api";

//reducer to manage component state with actions
import bookablesReducer from "../../reducers/bookables-reducer";

/**
 * import action creator functions that
 * will return actions used to update component state
 * */
import {
  setGroup,
  dataRequestSuccessful,
  dataRequestFailed,
  dataRequestInitiated,
} from "../../reducers/action-creators";

// //initial state for the reducer
const initialState = {
  group: "Rooms",
  bookables: [],
  isLoading: true,
  error: "",
};

const BookablesList = ({ bookable, setBookable }) => {
  const [state, dispatch] = useReducer(bookablesReducer, initialState);

  const { bookables, group, isLoading, error } = state;

  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = getBookablesInGroup(bookables, group);
  const bookableIndex = bookablesInGroup.indexOf(bookable);

  /**event handler functions */
  function handleOnChangeBookable(bookable) {
    setBookable(bookable);
  }
  function handleOnClickNextButton() {
    const nextBookableIndex = (bookableIndex + 1) % bookablesInGroup.length;
    setBookable(bookablesInGroup[nextBookableIndex]);
  }
  function handleOnChangeGroup(groupName) {
    dispatch(setGroup(groupName));
    setBookable(getBookablesInGroup(bookables, groupName)[0]);
  }

  /**Effects */
  //Loads bookables data only once:when the component mounts
  useEffect(() => {
    //url containing bookables data
    const url = "http://localhost:3001/bookables";

    async function fetchData(dataUrl) {
      try {
        dataRequestInitiated();
        const data = await getData(dataUrl);
        dispatch(dataRequestSuccessful(data));
        setBookable(getBookablesInGroup(data, group)[0]);
      } catch (error) {
        dispatch(dataRequestFailed(error.message));
      }
    }
    fetchData(url);
  }, []);

  /**UI */
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <div className="bookingsError">{error}</div>;
  }

  return bookable ? (
    <div>
      {/* groups selector */}
      <select
        name="group"
        value={group}
        onChange={(e) => handleOnChangeGroup(e.target.value)}
      >
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* Bookables list in the selected group */}
      <ul className="bookables items-list-nav">
        {bookablesInGroup?.map((b, i) => (
          <li key={i} className={b.id === bookable?.id ? "selected" : null}>
            <button className="btn" onClick={() => handleOnChangeBookable(b)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Next button */}
      <p>
        <button className="btn" onClick={handleOnClickNextButton}>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  ) : null;
};

//Returns bookables belonging to a certain group
function getBookablesInGroup(bookables, groupName) {
  return bookables?.filter((b) => b.group === groupName);
}

export default BookablesList;

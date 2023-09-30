import { useEffect, useReducer } from "react";
import { FaArrowRight } from "react-icons/fa";

import getData from "../../utils/api";

//reducer to manage component state with actions
import bookablesReducer from "../../reducers/bookables-reducer";

/**
 * import action creator functions that
 * will return actions used to update component state
 * */
import {
  nextBookable,
  setGroup,
  fetchBookablesSuccess,
  fetchBookablesError,
  setBookableIndex,
  fetchBookablesRequest,
} from "../../reducers/action-creators";
import Spinner from "../UI/Spinner";

// //initial state for the reducer
const initialState = {
  bookableIndex: 0,
  group: "Rooms",
  bookables: [],
  isLoading: true,
  error: "",
};

const BookablesList = ({ setBookable }) => {
  const [state, dispatch] = useReducer(bookablesReducer, initialState);
  const { bookables, group, isLoading, error, bookableIndex } = state;

  //List of all group names bookables are categorized into
  const groups = [...new Set(bookables.map((b) => b.group))];

  //List of bookables in the selected group
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  //compute and set bookable using bookableIndex
  setBookable(bookablesInGroup[bookableIndex]);

  /**event handler functions */
  function handleOnChangeBookable(index) {
    dispatch(setBookableIndex(index));
  }
  function handleOnClickNextButton() {
    dispatch(nextBookable());
  }
  function handleOnChangeGroup(group) {
    dispatch(setGroup(group));
  }

  /**Effects */
  //Loads bookables data only once:when the component mounts
  useEffect(() => {
    //url containing bookables data
    const url = "http://localhost:3001/bookables";

    async function fetchData(dataUrl) {
      try {
        fetchBookablesRequest();
        const data = await getData(dataUrl);
        dispatch(fetchBookablesSuccess(data));
      } catch (error) {
        dispatch(fetchBookablesError(error.message));
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
  return (
    <div>
      {/* groups selector */}
      <select
        name="group"
        value={group}
        onChange={(e) => handleOnChangeGroup(e.target.value)}
      >
        {groups.map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>

      {/* Bookables list in the selected group */}
      <ul className="bookables items-list-nav">
        {bookablesInGroup?.map((b, i) => (
          <li key={b.id} className={i === bookableIndex ? "selected" : null}>
            <button className="btn" onClick={() => handleOnChangeBookable(i)}>
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
  );
};

export default BookablesList;

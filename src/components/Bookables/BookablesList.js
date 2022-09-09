import { useEffect, useState } from "react";

// import components
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";

//fetches remote data
import getData from "../../utils/api";

// BookablesList component
const BookablesList = ({ bookable, setBookable }) => {
  /**Variables */
  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //get current group bookable belongs to
  const group = bookable?.group;

  //List of bookable items in group
  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );

  //List of all group names of bookables
  const groups = [...new Set(bookables.map((b) => b.group))];

  /**effects */
  useEffect(() => {
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        setBookable(bookables[1]);
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setBookable]);

  /**event handler functions */
  //called when user clicks on a bookable
  function changeBookable(selectedBookable) {
    setBookable(selectedBookable);
  }

  //called when user clicks `Next` button
  function changeNextBookable() {
    const indexOfBookable = bookablesInGroup.indexOf(bookable);
    const indexOfNextBookable = (indexOfBookable + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[indexOfNextBookable];
    setBookable(nextBookable);
  }

  //called when user selects group from selectbox
  function changeGroup(e) {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === e.target.value
    );
    setBookable(bookablesInSelectedGroup[0]);
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
        <select name="group" value={group} onChange={(e) => changeGroup(e)}>
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        {/* Bookables list */}
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((bookableItem) => (
            <li
              key={bookableItem.id}
              className={bookableItem.id === bookable.id ? "selected" : null}
            >
              <button
                className="btn"
                onClick={() => changeBookable(bookableItem)}
              >
                {bookableItem.title}
              </button>
            </li>
          ))}
        </ul>
        {/* Next button */}
        <p>
          <button className="btn" onClick={() => changeNextBookable()}>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
    </>
  );
};

export default BookablesList;

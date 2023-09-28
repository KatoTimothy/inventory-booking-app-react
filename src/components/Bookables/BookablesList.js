import { FaArrowRight } from "react-icons/fa";

/**
 * import action creator functions that 
 * will return actions used to update component state
 * */
import {
  nextBookable,
  setGroup,
  setBookableIndex,
} from "../../reducers/action-creators";

const BookablesList = ({ setBookable, state, dispatch }) => {
  const { group, bookableIndex, bookables } = state;
  //List of all group names bookables belong to
  const groups = [...new Set(bookables.map((b) => b.group))];

  //List of bookables in current group
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  setBookable(bookablesInGroup[bookableIndex]);

  /**event handler functions */
  function onChangeBookable(index) {
    dispatch(setBookableIndex(index));
  }
  function onClickNextButton() {
    dispatch(nextBookable());
  }
  function onChangeGroup(group) {
    dispatch(setGroup(group));
  }

  return (
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
  );
};

export default BookablesList;

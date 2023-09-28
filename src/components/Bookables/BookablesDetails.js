//This action is used to update details checkbox accordingly
import { toggleShowDetails } from "../../reducers/action-creators";

// import data
import data from "../../static.json";
const { days } = data;

const BookableDetails = ({ bookable, hasDetails, dispatch }) => {
  //event handlers
  const onShowDetails = (e) => {
    dispatch(toggleShowDetails(e.target.value));
  };

  return bookable ? (
    <div className="bookable-details item">
      {/* heading section */}
      <div className="item-header">
        <h2>{bookable.title}</h2>
        <span className="controls">
          <label>
            <input
              type="checkbox"
              checked={hasDetails}
              onChange={(e) => onShowDetails(e)}
            />
            <span>{hasDetails ? "Hide" : "Show"}</span> details
          </label>
        </span>
      </div>

      <p>{bookable.notes}</p>

      {/* details section */}
      {hasDetails && (
        <div className="item-details">
          <h3>Availability</h3>
          <div className="bookable-availability">
            <ul>
              {bookable.days.sort().map((dayIndex) => (
                <li key={dayIndex}> {days[dayIndex]}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default BookableDetails;

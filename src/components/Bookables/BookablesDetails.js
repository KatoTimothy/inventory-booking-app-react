import { useState } from "react";

//contains names of days of a week
import data from "../../static.json";
const { days } = data;

const BookableDetails = ({ bookable }) => {
  const [hasDetails, setHasDetails] = useState(true);

  /**Event handlers */
  const handleOnToggleDetails = () => {
    setHasDetails((hasDetails) => !hasDetails);
  };

  /**UI */
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
              onChange={handleOnToggleDetails}
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

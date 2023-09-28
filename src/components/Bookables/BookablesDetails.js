import { useState } from "react";

// import data
import data from "../../static.json";
const { days } = data;

//BookableDetails component
const BookableDetails = ({ bookable }) => {
  const [hasDetails, setHasDetails] = useState(true);

  //event handlers
  const onShowDetails = () => {
    setHasDetails((has) => !has);
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
              onChange={onShowDetails}
              checked={hasDetails}
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

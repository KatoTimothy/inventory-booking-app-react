import { useState } from "react";
// import data
import { days, sessions } from "../../static.json";

//BookableDetails component
const BookableDetails = ({ bookable }) => {
  const [hasDetails, setHasDetails] = useState(true);

  const toggleHasDetails = () => {
    setHasDetails((has) => !has);
  };

  return bookable ? (
    <div className="bookable-details item">
      {/* header */}
      <div className="item-header">
        <h2>{bookable.title}</h2>
        <span className="controls">
          <label>
            <input
              type="checkbox"
              onChange={toggleHasDetails}
              checked={hasDetails}
            />
            Show details
          </label>
        </span>
      </div>
      <p>{bookable.notes}</p>
      {/* details page */}
      {hasDetails} && (
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
      )
    </div>
  ) : null;
};

export default BookableDetails;

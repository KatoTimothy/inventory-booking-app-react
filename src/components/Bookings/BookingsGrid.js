const BookingsGrid = (props) => {
  const { week, bookable, booking, setBooking } = props;

  return (
    <div className="bookings-grid placeholder">
      <h3>Bookings Grid</h3>
      <p>{bookable?.title}</p>
      <p>{week.date.toISOString()}</p>
    </div>
  );
};

export default BookingsGrid;

import WeekPicker from "./WeekPicker";

const BookingsPage = () => (
  <main className="bookings-page">
    <p>Bookings!</p>
    <WeekPicker date={new Date()} />
  </main>
);

export default BookingsPage;

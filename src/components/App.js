import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "../App.css";

import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";

import UserPicker from "./Users/UserPicker";
import BookingsPage from "./Bookings/BookingsPage";
import { BookablesPage } from "./Bookables/BookablesPage";
import UsersPage from "./Users/UsersPage";

const App = () => (
  <Router>
    <div className="App">
      <header>
        <nav>
          <ul>
            {/* Bookings  */}
            <li>
              <Link to="/bookings" className="btn btn-header">
                <FaCalendarAlt />
                <span>Bookings</span>
              </Link>
            </li>
            {/* Bookables link */}
            <li>
              <Link to="/bookables" className="btn btn-header">
                <FaDoorOpen />
                <span>Bookables</span>
              </Link>
            </li>
            {/* Users link */}
            <li>
              <Link to="/users" className="btn btn-header">
                <FaUsers />
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>
        <UserPicker />
      </header>
      <Routes>
        <Route path="/" element={<BookablesPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/bookables" element={<BookablesPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;

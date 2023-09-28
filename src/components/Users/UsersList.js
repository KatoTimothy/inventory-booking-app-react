import { useEffect, useReducer, useRef } from "react";

import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

import usersReducer from "../../reducers/users-reducer";
import {
  setUserIndex,
  fetchUsersError,
  fetchUsersRequest,
  fetchUsersSuccess,
  nextUser,
} from "../../reducers/action-creators";
import UserDetails from "./UserDetails";

const initialState = {
  isLoading: true,
  users: [],
  error: "",
  userIndex: 0,
};

const UsersList = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  /**Manage state */
  const { users, userIndex, isLoading, error } = state;
  const selectedUser = users[userIndex];

  /**Effects */
  useEffect(() => {
    //fetch data from server
    dispatch(fetchUsersRequest());
    getData("http://localhost:3001/users")
      .then((userData) => {
        dispatch(fetchUsersSuccess(userData));
      })
      .catch((error) => {
        dispatch(fetchUsersError(error.message));
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return (
      <main className="users-page">
        <Spinner /> User data is loading...
      </main>
    );
  }
  return (
    <div>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li className={i === userIndex ? "selected" : null} key={u.id}>
            <button className="btn" onClick={() => dispatch(setUserIndex(i))}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

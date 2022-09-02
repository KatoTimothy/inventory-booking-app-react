import { useState, useEffect, useReducer } from "react";
import usersReducer from "../../reducers/users-reducer";
import {
  fetchUsersError,
  fetchUsersRequest,
  setUserIndex,
  fetchUsersSuccess,
} from "../../reducers/action-creators";

import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

//import data from "../../static.json";
//const { users } = data;

const UsersList = () => {
  const initialState = {
    userIndex: 2,
    error: "",
    isLoading: true,
    users: [],
  };
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { users, isLoading, userIndex, error } = state;

  window.state = state;
  useEffect(() => {
    //make a request for the data
    dispatch(fetchUsersRequest());

    //fetch data
    getData("http://localhost:3001/users")
      .then((users) => {
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersError(error.message));
      });
  }, []);

  const selectedUser = users[userIndex];
  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return (
      <p>
        <Spinner /> User data is loading...
      </p>
    );
  }
  return (
    <>
      <div>
        <ul className="users items-list-nav">
          {users.map((user, index) => (
            <li
              className={index === userIndex ? "selected" : null}
              key={user.id}
            >
              <button
                className="btn"
                onClick={() => dispatch(setUserIndex(index))}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="item ">
        <div className="item-header">
          <h2>{selectedUser.name}</h2>
        </div>
        <div className="item-details">
          <h3>{selectedUser.title}</h3>
          <div>{selectedUser.notes}</div>
        </div>
      </div>
    </>
  );
};

export default UsersList;

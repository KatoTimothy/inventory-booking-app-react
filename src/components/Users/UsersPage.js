import React, { useReducer, useEffect, useContext } from "react";

import UsersList from "./UsersList";
import UserDetails from "./UserDetails";
import Spinner from "../UI/Spinner";
import { UserContext } from "./UserProvider";

// import usersReducer from "../../reducers/users-reducer";
// import {
//   setUserIndex,
//   fetchUsersError,
//   fetchUsersRequest,
//   fetchUsersSuccess,
//   nextUser,
// } from "../../reducers/action-creators";

// import getData from "../../utils/api";

// const initialState = {
//   isLoading: true,
//   users: [],
//   error: "",
//   userIndex: 0,
// };
export default function UsersPage() {
  // const [state, dispatch] = useReducer(usersReducer, initialState);
  const { state, dispatch } = useContext(UserContext);
  const { isLoading, error } = state;

  /**Effects */
  // useEffect(() => {
  //   //fetch data from server
  //   const url = "http://localhost:3001/users";

  //   async function fetchData(dataUrl) {
  //     try {
  //       dispatch(fetchUsersRequest());
  //       const data = await getData(dataUrl);
  //       if (data) {
  //         dispatch(fetchUsersSuccess(data));
  //       }
  //     } catch (error) {
  //       dispatch(fetchUsersError(error.message));
  //     }
  //   }
  //   fetchData(url);
  // }, []);
  /** UI */
  if (error) {
    return (
      <main className="bookingsError">
        <p>{error}</p>;
      </main>
    );
  }
  if (isLoading) {
    return (
      <main className="users-page">
        <p>
          <Spinner /> User data is loading...
        </p>
      </main>
    );
  }
  return (
    <main className="users-page">
      <UsersList state={state} dispatch={dispatch} />
      <UserDetails state={state} dispatch={dispatch} />
    </main>
  );
}

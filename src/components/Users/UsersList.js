import { useContext, useReducer, useEffect } from "react";

import Spinner from "../UI/Spinner";

import { UserContext } from "./UserProvider";

import getData from "../../utils/api";

import usersReducer from "../../reducers/users-reducer";
import {
  setUserIndex,
  fetchUsersError,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "../../reducers/action-creators";

//initial state for user reducer
const initialState = {
  isLoading: true,
  error: "",
  users: [],
  userIndex: 0,
};
const UsersList = ({ setSelectedUser }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { users, isLoading, error } = state;

  const { index, setIndex } = useContext(UserContext);
  setSelectedUser(users[index]);

  //Event handlers
  function handleOnSelectUser(i) {
    dispatch(setUserIndex(i));
    setIndex(i);
  }

  /**Effects */
  //Runs once, when loading user data
  useEffect(() => {
    const uri = "http://localhost:3001/users";
    async function fetchUserData(uri) {
      try {
        dispatch(fetchUsersRequest());
        const data = await getData(uri);
        data && dispatch(fetchUsersSuccess(data));
      } catch (error) {
        dispatch(fetchUsersError(error.message));
      }
    }
    fetchUserData(uri);
  }, []);

  /**UI */
  if (isLoading) {
    return (
      <span>
        <Spinner />;
      </span>
    );
  }
  if (error) {
    return <div className="bookigsErrror">{error}</div>;
  }
  return (
    <div>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li className={i === index ? "selected" : null} key={u.id}>
            <button className="btn" onClick={() => handleOnSelectUser(i)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

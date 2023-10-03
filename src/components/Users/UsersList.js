import { useContext, useReducer, useEffect } from "react";

import Spinner from "../UI/Spinner";

import { UserContext } from "./UserProvider";

import getData from "../../utils/api";

import usersReducer from "../../reducers/users-reducer";
import {
  dataRequestInitiated,
  dataRequestSuccessful,
  dataRequestFailed,
} from "../../reducers/action-creators";

//initial state for user reducer
const initialState = {
  isLoading: true,
  error: "",
  users: [],
};
const UsersList = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { users, isLoading, error } = state;

  const { user, setUser } = useContext(UserContext);

  /**Event handlers */
  function handleOnSelectUser(user) {
    setUser(user);
  }

  /**Effects */
  //Runs once, when loading user data
  useEffect(() => {
    const uri = "http://localhost:3001/users";
    async function fetchUserData(uri) {
      try {
        dispatch(dataRequestInitiated());
        const data = await getData(uri);
        dispatch(dataRequestSuccessful(data));
        setUser(data[0]);
      } catch (error) {
        dispatch(dataRequestFailed(error.message));
      }
    }
    fetchUserData(uri);
  }, [setUser]);

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
  return user ? (
    <div>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li className={u.id === user.id ? "selected" : null} key={i}>
            <button className="btn" onClick={() => handleOnSelectUser(u)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="bookingsError">Oops user seems to be null</div>
  );
};

export default UsersList;

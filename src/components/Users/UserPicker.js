import { useContext, useEffect, useReducer } from "react";
import Spinner from "../UI/Spinner";
import { UserContext } from "./UserProvider";

import {
  dataRequestFailed,
  dataRequestInitiated,
  dataRequestSuccessful,
} from "../../reducers/action-creators";

import usersReducer from "../../reducers/users-reducer";
import getData from "../../utils/api";

const initialState = {
  isLoading: true,
  error: "",
  users: [],
};

const UserPicker = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { isLoading, users } = state;

  //Extract the global state (current user)
  const { user, setUser } = useContext(UserContext);

  /**Event handlers */
  function handleOnChangeUser(e) {
    const userId = parseInt(e.target.value);
    const userIndex = users.findIndex((u) => u.id === userId);
    setUser(users[userIndex]);
  }

  /**Effects */
  //Runs once, to load user data
  useEffect(() => {
    const uri = "http://localhost:3001/users";
    async function fetchUserData(uri) {
      try {
        dispatch(dataRequestInitiated());
        const data = await getData(uri);
        dispatch(dataRequestSuccessful(data));
      } catch (error) {
        dispatch(dataRequestFailed(error.message));
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

  return user ? (
    <select value={user.id} onChange={(e) => handleOnChangeUser(e)}>
      {users.map((u, i) => (
        <option key={i} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  ) : null;
};

export default UserPicker;

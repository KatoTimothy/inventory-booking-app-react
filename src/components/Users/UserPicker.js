import { useContext, useEffect, useReducer } from "react";
import Spinner from "../UI/Spinner";
import { UserContext } from "./UserProvider";

import {
  setUserIndex,
  fetchUsersError,
  fetchUsersRequest,
  fetchUsersSuccess,
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

  //Extract the globally shared selected userIndex
  const { index, setIndex } = useContext(UserContext);

  /**Event handlers */
  function handleOnChangeUser(e) {
    const inputValue = parseInt(e.target.value);
    setIndex(inputValue);
  }

  /**Effects */
  //Runs once, to load user data
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

  return (
    <select value={index} onChange={(e) => handleOnChangeUser(e)}>
      {users.map(({ name }, i) => (
        <option key={i} value={i}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default UserPicker;

import { createContext, useReducer, useEffect } from "react";
import usersReducer from "../../reducers/users-reducer";
import {
  fetchUsersError,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "../../reducers/action-creators";

import getData from "../../utils/api";

const initialState = {
  isLoading: true,
  users: [],
  error: "",
  userIndex: 0,
};

export const UserContext = createContext({
  state: null,
  dispatch: null,
});

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  /**Effects */
  useEffect(() => {
    //fetch data from server
    const url = "http://localhost:3001/users";

    async function fetchData(dataUrl) {
      try {
        dispatch(fetchUsersRequest());
        const data = await getData(dataUrl);
        if (data) {
          dispatch(fetchUsersSuccess(data));
        }
      } catch (error) {
        dispatch(fetchUsersError(error.message));
      }
    }
    fetchData(url);
  }, []);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

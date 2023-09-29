import { useContext } from "react";
import Spinner from "../UI/Spinner";
import { UserContext } from "./UserProvider";

import { setUserIndex } from "../../reducers/action-creators";

const UserPicker = () => {
  const { state, dispatch } = useContext(UserContext);
  const { isLoading, users, userIndex } = state;

  //event handlers
  function handleOnChangeUser(e) {
    dispatch(setUserIndex(parseInt(e.target.value)));
  }
  if (isLoading) {
    return (
      <span>
        <Spinner />;
      </span>
    );
  }
  return (
    <select value={userIndex} onChange={(e) => handleOnChangeUser(e)}>
      {users.map(({ name }, index) => (
        <option key={index} value={index}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default UserPicker;

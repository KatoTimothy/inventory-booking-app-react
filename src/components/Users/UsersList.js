import { useContext } from "react";
import { setUserIndex } from "../../reducers/action-creators";
import { UserContext } from "./UserProvider";

const UsersList = () => {
  const { state, dispatch } = useContext(UserContext);
  const { users, userIndex } = state;

  //Event handlers
  function handleOnSelectUser(index) {
    dispatch(setUserIndex(index));
  }
  return (
    <div>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li className={i === userIndex ? "selected" : null} key={u.id}>
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

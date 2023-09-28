import { setUserIndex } from "../../reducers/action-creators";

const UsersList = ({ state, dispatch }) => {
  /**Manage state */
  const { users, userIndex } = state;

  //Event handlers
  function onSelectUser(index) {
    dispatch(setUserIndex(index));
  }
  return (
    <div>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li className={i === userIndex ? "selected" : null} key={u.id}>
            <button className="btn" onClick={() => onSelectUser(i)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

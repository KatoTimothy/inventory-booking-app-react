import { useContext } from "react";
import { UserContext } from "./UserProvider";
import UserPicker from "./UserPicker";

const UserDetails = () => {
  const { state } = useContext(UserContext);

  const { users, userIndex } = state;
  const user = users[userIndex];

  return user ? (
    <div className="item user ">
      <div className="item-header">
        <h2>{user.name}</h2>
        <UserPicker />
      </div>
      <div className="item-details">
        <h3>{user.title}</h3>
        <div>{user.notes}</div>
      </div>
    </div>
  ) : null;
};

export default UserDetails;

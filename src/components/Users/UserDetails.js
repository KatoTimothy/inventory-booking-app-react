import { useContext } from "react";
import { UserContext } from "./UserProvider";

const UserDetails = () => {
  const { user } = useContext(UserContext);
  return user ? (
    <div className="item user ">
      <div className="item-header">
        <h2>{user.name}</h2>
      </div>
      <div className="item-details">
        <h3>{user.title}</h3>
        <div>{user.notes}</div>
      </div>
    </div>
  ) : null;
};

export default UserDetails;

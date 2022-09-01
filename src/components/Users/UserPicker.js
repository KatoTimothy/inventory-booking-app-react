import { useState, useEffect } from "react";
import Spinner from "../UI/Spinner";

//import data from "../../static.json";
//const { users } = data;

const UserPicker = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  if (users === null) {
    return <Spinner />;
  }

  return (
    <select>
      {users.map(({ name, id }) => (
        <option key={id}>{name}</option>
      ))}
    </select>
  );
};

export default UserPicker;

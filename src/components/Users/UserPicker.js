import { useState, useEffect } from "react";
import Spinner from "../UI/Spinner";

//import data from "../../static.json";
//const { users } = data;

const UserPicker = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
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

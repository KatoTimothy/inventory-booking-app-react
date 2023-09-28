import { useState, useEffect } from "react";
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";

//import data from "../../static.json";
//const { users } = data;

const UserPicker = () => {
  const [users, setUsers] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getData("http://localhost:3001/users")
      .then((userData) => {
        setUsers(userData);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  if (isLoading) {
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

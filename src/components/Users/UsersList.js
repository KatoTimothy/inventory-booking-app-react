import { useState, useEffect } from "react";

import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

const UsersList = ({ selectedUser, setSelectedUser }) => {
  /**Manage state */
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**Effects */
  useEffect(() => {
    //fetch data from server
    getData("http://localhost:3001/users")
      .then((users) => {
        setSelectedUser(users[1]); //immediately select user
        setUsers(users); //populate the list of users
        setIsLoading(false); //stop the loading state
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setSelectedUser]);

  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return (
      <p>
        <Spinner /> User data is loading...
      </p>
    );
  }
  return (
    <>
      <div>
        <ul className="users items-list-nav">
          {users.map((user) => (
            <li
              className={user.id === selectedUser?.id ? "selected" : null}
              key={user.id}
            >
              <button className="btn" onClick={() => setSelectedUser(user)}>
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UsersList;

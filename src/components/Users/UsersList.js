import { useState } from "react";
import data from "../../static.json";
 
const { users } = data;

const UsersList = () => {
  const [userIndex, setUserIndex] = useState(1);

  const selectedUser = users[userIndex];

  return (
    <>
      <div>
        <ul className="users items-list-nav">
          {users.map((user, index) => (
            <li
              className={index === userIndex ? "selected" : null}
              key={user.id}
            >
              <button onClick={() => setUserIndex(index)} className="btn">
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
        <div className="item ">
            <div className="item-header">
                <h2>{selectedUser.name}</h2>
            </div>
            <div className="item-details">
                <h3>{selectedUser.title}</h3>
                <div>{selectedUser.notes}</div>
            </div>
        </div>
      
    </>
  );
};

export default UsersList;

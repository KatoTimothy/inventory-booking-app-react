//import components
import { useState } from "react";
import UserDetails from "./UserDetails";
import UsersList from "./UsersList";

//userList component
const UsersPage = () => {
  //manage user state
  const [selectedUser, setSelectedUser] = useState(null);

  // UI
  return (
    <main className="users-page">
      <UsersList
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <UserDetails selectedUser={selectedUser} />
    </main>
  );
};

export default UsersPage;

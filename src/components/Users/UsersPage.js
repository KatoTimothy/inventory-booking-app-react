import UsersList from "./UsersList";
import UserDetails from "./UserDetails";
import { useState } from "react";

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <main className="users-page">
      <UsersList setSelectedUser={setSelectedUser} />
      <UserDetails user={selectedUser} setSelectedUser={setSelectedUser} />
    </main>
  );
}

import UsersList from "./UsersList";
import UserDetails from "./UserDetails";

export default function UsersPage() {
  return (
    <main className="users-page">
      <UsersList />
      <UserDetails />
    </main>
  );
}

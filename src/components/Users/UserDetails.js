const UserDetails = ({ dispatch, state }) => {
  const { users, userIndex } = state;
  const user = users[userIndex];

  //event handlers
  // const currentUserIndex = user
  function onChangeUser(e) {}

  return user ? (
    <div className="item user ">
      <div className="item-header">
        <h2>{user.name}</h2>
        <select value={user.name} onChange={(e) => onChangeUser(e)}>
          {users.map(({ name, id }) => (
            <option value={name} key={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="item-details">
        <h3>{user.title}</h3>
        <div>{user.notes}</div>
      </div>
    </div>
  ) : null;
};

export default UserDetails;

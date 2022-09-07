const UserDetails = ({ selectedUser }) => {
  return selectedUser ? (
    <div className="item user ">
      <div className="item-header">
        <h2>{selectedUser.name}</h2>
      </div>
      <div className="item-details">
        <h3>{selectedUser.title}</h3>
        <div>{selectedUser.notes}</div>
      </div>
    </div>
  ) : null;
};

export default UserDetails;

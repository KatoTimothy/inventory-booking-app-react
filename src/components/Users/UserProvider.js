import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: null,
});

//Component exposes the selected user index
//to all its nested components
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

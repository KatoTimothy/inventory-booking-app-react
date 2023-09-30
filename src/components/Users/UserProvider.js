import { createContext, useState } from "react";

export const UserContext = createContext({
  index: null,
  setIndex: null,
});

//Component exposes the selected user index
//to all its nested components
const UserProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  return (
    <UserContext.Provider value={{ index, setIndex }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

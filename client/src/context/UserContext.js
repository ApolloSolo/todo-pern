import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState([{
    id: "",
    username: "",
    email: "",
  }]);

  const updateUser = (obj) => {
    setUser((prevState) => [...prevState, {obj}]);
  }
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

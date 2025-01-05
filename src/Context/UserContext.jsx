import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [surname, setSurname] = useState('');

  const handleLogin = (userSurname) => setSurname(userSurname);

  return (
    <UserContext.Provider value={{ surname, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
}

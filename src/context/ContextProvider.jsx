
import React, { createContext, useState } from "react";

export const userContext = createContext();


const ContextProvider = ({ children }) => {
  const [authKey, setAuthKey] = useState(null);

  const value = { authKey, setAuthKey };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default ContextProvider;

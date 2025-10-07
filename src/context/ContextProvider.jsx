import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [sessionId, setSessionId] = useState(null);
  const [jwtToken, setJwtToken] = useState(accessToken || null);

  useEffect(() => {
    if (accessToken) {
      setJwtToken(accessToken);
    }
  }, [accessToken]);
  return (
    <userContext.Provider value={{ sessionId, setSessionId, jwtToken }}>
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;

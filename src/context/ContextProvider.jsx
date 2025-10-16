import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [sessionId, setSessionId] = useState(null);
  const [jwtToken, setJwtToken] = useState(accessToken || null);
  const [projectId, setProjectId] = useState(null);
  const [projectStatus, setProjectStatus] = useState(null);

  useEffect(() => {
    if (accessToken) {
      setJwtToken(accessToken);
    }
  }, [accessToken]);
  return (
    <userContext.Provider
      value={{
        sessionId,
        setSessionId,
        jwtToken,
        projectId,
        setProjectId,
        projectStatus,
        setProjectStatus,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;

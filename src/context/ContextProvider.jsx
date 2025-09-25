import { createContext } from "react";

export const userContext = createContext();

const ContextProvider = ({children})=>{
    const user = "yash"
    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export default ContextProvider;
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const [user,setUser] = useState(null)
    const navigate = useNavigate()

    const value = {
        user,
        setUser,
        navigate
    };

    return <AppContext.Provider value={value}>
            { children }
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);
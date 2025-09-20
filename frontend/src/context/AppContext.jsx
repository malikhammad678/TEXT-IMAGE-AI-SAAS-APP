import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const [user,setUser] = useState(null)
    const navigate = useNavigate()
    const [openForm,setIsOpenForm] = useState(false)

    const value = {
        user,
        setUser,
        navigate,
        openForm,
        setIsOpenForm
    };

    return <AppContext.Provider value={value}>
            { children }
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext()


export const AppContextProvider = ({ children }) => {

    const [user,setUser] = useState(null)
    const navigate = useNavigate()
    const [openForm,setIsOpenForm] = useState(false)
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [credits,setCredits] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const loadCredentials = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/credits`, { headers: {token} })
            if(data.success){
                setCredits(data.credits);
                console.log(data.credits)
                setUser(data.user)
            }
        } catch (error) {
        toast.error(error.response?.data?.message || error.message)
        }
    }
const generateImage = async (prompt) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/image/generate-image`,
      { prompt },
      { headers: { token } }
    );

    if (data.success) {
      loadCredentials();

      if (data.creditBalance === 0) {
        navigate("/buy-credits");
        return null;
      }

      return data.image;
    } else {
      toast.error(data.message);
      loadCredentials();
    }
  } catch (error) {
    const creditBalance = error.response?.data?.creditBalance;

    if (creditBalance === 0) {
      navigate("/buy-credits");
      return null;
    }

    toast.error(error.response?.data?.message || error.message);
  }
};

    useEffect(() => {
      if(token){
        loadCredentials()
      }
    },[token])

    const value = {
        user,
        setUser,
        navigate,
        openForm,
        setIsOpenForm,
        backendUrl,
        token,
        setToken,
        credits,
        setCredits,
        loadCredentials,
        generateImage
    };

    return <AppContext.Provider value={value}>
            { children }
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      axios.get('/profile')
        .then((res) => {
          setUserData(res.data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          // Handle the error here
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);


  return (
    <UserContext.Provider value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}
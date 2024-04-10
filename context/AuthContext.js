"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      if (!session?.user?.email) {
        return null;
      }
      const response = await fetch(`api/user/${session?.user?.email}`);
      const data = await response.json();
      // console.log(data);

      if (response.error) {
        console.log("ERROR GET USER");
      }

      // console.log(response);
      setUser(data);
    };
    getUser();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

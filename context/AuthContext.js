"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  // searchValue
  const [searchValue, setSearchValue] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setPageLoading(true);
    const getUser = async () => {
      if (!session?.user?.email) {
        return null;
      }
      const response = await fetch(
        `http://localhost:3000/api/user/${session?.user?.email}`
      );
      const data = await response.json();
      // console.log(data);

      if (response.error) {
        console.log("ERROR GET USER");
      }

      // console.log(response);
      setUser(data);
      setPageLoading(false);
    };
    getUser();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userPosts,
        setUserPosts,
        pageLoading,
        setPageLoading,
        selectedCategory,
        setSelectedCategory,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

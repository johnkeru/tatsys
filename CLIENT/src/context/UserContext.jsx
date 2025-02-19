import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import Loading from "../global/components/Loading";
import env from "../utils/env";

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: async () => {},
  isLoading: false,
  error: null,
  logout: async () => {},
});

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  // only use in login
  const handleSetUserInitialization = async () => {
    const res = await api.get("/get-user");
    setCurrentUser(res.data.user);
  };
  const handleLogout = async () => {
    await api.get("/logout");
    setCurrentUser(null);
    location.href = env("AUTH_CLIENT_URL") + "/login";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/get-user");
        if (res.data.user) setCurrentUser(res.data.user);
        else location.href = env("AUTH_CLIENT_URL") + "/login";
      } catch (error) {
        console.error("Error fetching user:", error);
        location.href = env("AUTH_CLIENT_URL") + "/login";
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [nav]); // Dependency array ensures useEffect runs once when the component mounts

  const value = {
    currentUser,
    setCurrentUser: handleSetUserInitialization,
    logout: handleLogout,
    isLoading,
  };

  if (isLoading) return <Loading />;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
export const useUser = () => useContext(UserContext);

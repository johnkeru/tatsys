import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import Loading from "../global/components/Loading";
import env from "../utils/env";

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: async () => {},
  isLoading: false,
  logout: async () => {},
});

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  // Store token in localStorage
  const storeToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("token") || null;
  };

  const handleSetUserInitialization = async () => {
    try {
      const res = await api.get("/get-user");
      if (res.data.user) {
        setCurrentUser(res.data.user);
        if (res.data.jwtToken) {
          storeToken(res.data.jwtToken);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleLogout = async () => {
    await api.get("/logout");
    setCurrentUser(null);
    localStorage.removeItem("token");
    location.href = env("AUTH_CLIENT_URL") + "/login";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/get-user");
        if (res.data.user) {
          setCurrentUser(res.data.user);
          if (res.data.jwtToken) {
            storeToken(res.data.jwtToken);
          }
        } else {
          location.href = env("AUTH_CLIENT_URL") + "/login";
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        location.href = env("AUTH_CLIENT_URL") + "/login";
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const value = {
    currentUser,
    setCurrentUser: handleSetUserInitialization,
    logout: handleLogout,
    isLoading,
    jwtToken: getToken(),
  };

  if (isLoading) return <Loading />;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
export const useUser = () => useContext(UserContext);


import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../config/api";
import LoadingPage from "../global/components/Loading";

const UserContext = createContext(
    {
        currentUser: null,
        setCurrentUser: async () => { },
        isLoading: false,
        error: null,
        logout: async () => { },
    }
)

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    // only use in login
    const handleSetUserInitialization = async () => {
        const res = await authApi.get('/get-user')
        setCurrentUser(res.data.user)
    }
    const handleLogout = async () => {
        await authApi.get('/logout')
        setCurrentUser(null)
        location.href='http://localhost:3000/login'
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await authApi.get('/get-user');
                if (res.data.user) setCurrentUser(res.data.user);
                else location.href='http://localhost:3000/login';
            } catch (error) {
                console.error("Error fetching user:", error);
                location.href='http://localhost:3000/login';
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []); // Dependency array ensures useEffect runs once when the component mounts


    const value = {
        currentUser,
        setCurrentUser: handleSetUserInitialization,
        logout: handleLogout,
        isLoading,
    }

    if (isLoading) return <LoadingPage />

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserProvider
export const useUser = () => useContext(UserContext)

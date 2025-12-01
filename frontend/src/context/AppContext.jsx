import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUsers } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
                // Select first user as default current user for demo purposes if none selected
                if (data.length > 0 && !currentUser) {
                    setCurrentUser(data[0]);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUsers();
    }, [refreshTrigger]);

    const triggerRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <AppContext.Provider value={{
            users,
            currentUser,
            setCurrentUser,
            loadingUsers,
            triggerRefresh,
            refreshTrigger
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

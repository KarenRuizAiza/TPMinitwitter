import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const UserList = () => {
    const { users, loadingUsers, currentUser, setCurrentUser } = useAppContext();

    if (loadingUsers) {
        return <div className="skeleton h-96 w-full"></div>;
    }

    return (
        <div className="card bg-base-100 shadow-sm h-full">
            <div className="card-body p-4">
                <h2 className="card-title text-sm font-bold text-gray-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    Lista de Usuarios
                </h2>
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li key={user.id}>
                            <div
                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-base-200 transition-colors ${currentUser?.id === user.id ? 'bg-primary/10' : ''}`}
                                onClick={() => setCurrentUser(user)}
                            >
                                <div className="avatar placeholder">
                                    <div className={`bg-neutral text-neutral-content rounded-full w-10 flex items-center justify-center ${currentUser?.id === user.id ? 'bg-primary text-primary-content' : ''}`}>
                                        <span>{user.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col overflow-hidden flex-1">
                                    <span className="font-semibold text-sm truncate">{user.name}</span>
                                    <Link to={`/user/${user.id}`} className="text-xs text-gray-500 truncate hover:underline hover:text-primary" onClick={(e) => e.stopPropagation()}>
                                        @{user.userName}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserList;

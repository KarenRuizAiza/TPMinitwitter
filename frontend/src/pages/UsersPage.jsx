import React from 'react';
import Layout from '../components/Layout';
import UserCard from '../components/UserCard';
import CreateUserModal from '../components/CreateUserModal';
import { useAppContext } from '../context/AppContext';
import { deleteUser } from '../services/api';

const UsersPage = () => {
    const { users, loadingUsers, triggerRefresh } = useAppContext();

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            triggerRefresh();
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error al eliminar el usuario");
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                <button
                    className="btn btn-primary rounded-full text-white gap-2"
                    onClick={() => document.getElementById('create_user_modal').showModal()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    Crear Usuario
                </button>
            </div>

            {loadingUsers ? (
                <div className="flex justify-center p-8">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map(user => (
                        <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
                    ))}
                </div>
            )}

            {!loadingUsers && users.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                    No hay usuarios registrados.
                </div>
            )}

            <CreateUserModal />
        </Layout>
    );
};

export default UsersPage;

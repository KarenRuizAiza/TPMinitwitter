import React, { useState } from 'react';
import { createUser } from '../services/api';
import { useAppContext } from '../context/AppContext';

const CreateUserModal = () => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const { triggerRefresh } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !userName.trim()) return;

        setLoading(true);
        try {
            await createUser(name, userName);
            setName('');
            setUserName('');
            document.getElementById('create_user_modal').close();
            triggerRefresh();
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Error al crear el usuario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog id="create_user_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg mb-4">Crear Nuevo Usuario</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Nombre Completo</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Juan Pérez"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Nombre de Usuario</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: juanperez"
                            className="input input-bordered w-full"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-action">
                        <button
                            type="submit"
                            className={`btn btn-primary ${loading ? 'loading' : ''}`}
                            disabled={loading || !name.trim() || !userName.trim()}
                        >
                            Crear Usuario
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default CreateUserModal;

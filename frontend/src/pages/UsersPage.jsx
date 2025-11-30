import React, { useState } from 'react';

// Componente para la tarjeta de usuario
function UserCard({ user, onDelete }) {
  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{user.name}</h2>
        <p>@{user.userName}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-error btn-sm" onClick={() => onDelete(user.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente para el formulario de creación de usuario
function CreateUserForm({ onUserCreated, onClose }) {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !userName) {
      setError('Nombre y nombre de usuario son requeridos.');
      return;
    }
    setError(null);
    setIsLoading(true);

    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, userName }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.message || 'Error al crear el usuario') });
        }
        return response.json();
      })
      .then(newUser => {
        onUserCreated(newUser);
        onClose(); // Cierra el modal al éxito
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Nombre Completo</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Jane Doe"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Nombre de Usuario</span>
        </label>
        <input
          type="text"
          placeholder="Ej: janedoe"
          className="input input-bordered w-full"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="modal-action">
        <button type="button" className="btn" onClick={onClose} disabled={isLoading}>Cancelar</button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner"></span> : 'Crear Usuario'}
        </button>
      </div>
    </form>
  );
}


export default function UsersPage({ users, setUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUserCreated = (newUser) => {
    setUsers(currentUsers => [...currentUsers, newUser]);
  };

  const handleUserDeleted = (userId) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");

    if (isConfirmed) {
      fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
          }
          setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
          alert("Usuario eliminado correctamente ✔");
        })
        .catch(error => {
          console.error("Error:", error);
          alert(error.message || "No se pudo eliminar el usuario.");
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center mb-6">
        <button className="btn btn-primary" onClick={openModal}>
          Crear Usuario
        </button>
      </div>

      {/* Lista de Usuarios */}
      {users && users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <UserCard key={user.id} user={user} onDelete={handleUserDeleted} />
          ))}
        </div>
      ) : (
        <p className="text-center">No se encontraron usuarios. Intenta crear uno nuevo.</p>
      )}

      {/* Modal para Crear Usuario */}
      {isModalOpen && (
        <dialog id="create_user_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Nuevo Usuario</h3>
            <CreateUserForm onUserCreated={handleUserCreated} onClose={closeModal} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

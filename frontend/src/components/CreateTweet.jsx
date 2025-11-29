import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function CreateTweet({ onAdd, onClose, users = [] }) {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = () => {
    if (!user) return alert("Por favor, selecciona un usuario.");
    if (text.trim().length < 3)
      return alert("El tweet debe tener al menos 3 caracteres.");

    onAdd({ author: user, content: text });
    setText("");
    setUser("");
  };

  return (
    <div className="space-y-4 pt-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Publicar como</label>
          <select
            className="select select-bordered w-full"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          >
            <option disabled value="">
              Selecciona un usuario
            </option>
            {users.map((u) => (
              <option key={u.id} value={u.userName}>{u.userName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">¿Qué está pasando?</label>
          <textarea
            className="textarea textarea-bordered w-full h-28"
            placeholder="Escribe tu tweet aquí..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={280}
          ></textarea>
          <p className="text-right text-sm text-darkText mt-1">
            {text.length} / 280
          </p>
        </div>
        
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="btn btn-ghost">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="btn btn-primary text-white">
            <FiSend />
            Publicar
          </button>
        </div>
      </div>
  );
}

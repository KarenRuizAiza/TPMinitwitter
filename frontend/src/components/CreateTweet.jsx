import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { createTweet } from '../services/api';

const CreateTweet = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, triggerRefresh } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Debes seleccionar un usuario");
    if (!text.trim()) return;

    setLoading(true);
    try {
      await createTweet(currentUser.id, text);
      setText('');
      document.getElementById('create_tweet_modal').close();
      triggerRefresh();
    } catch (error) {
      console.error("Error creating tweet:", error);
      alert("Error al crear el tweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="create_tweet_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg mb-4">Crear Nuevo Tweet</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea textarea-bordered w-full h-32 text-lg"
            placeholder="¿Qué está pasando?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={280}
            required
          ></textarea>
          <div className="modal-action flex justify-between items-center">
            <span className="text-sm text-gray-500">{text.length}/280</span>
            <button 
              type="submit" 
              className={`btn btn-primary rounded-full px-6 ${loading ? 'loading' : ''}`}
              disabled={loading || !text.trim() || !currentUser}
            >
              Tweetear
            </button>
          </div>
          {!currentUser && (
            <p className="text-error text-sm mt-2">Selecciona un usuario en la barra lateral para tweetear.</p>
          )}
        </form>
      </div>
    </dialog>
  );
};

export default CreateTweet;

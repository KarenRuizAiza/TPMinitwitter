import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateTweet from "./components/CreateTweet";
import UsersPage from "./pages/UsersPage";

// Componente de Layout que define la estructura de la página
const AppLayout = ({ onNewTweetClick, users, tweets, setTweets }) => (
  <div className="min-h-screen bg-base-200">
    <Header onNewTweetClick={onNewTweetClick} />
    {/* Outlet renderizará el componente de la ruta actual (Home, UsersPage, etc.) */}
    <Outlet context={{ users, tweets, setTweets }} />
  </div>
);

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isCreateTweetModalOpen, setCreateTweetModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const addTweet = ({ author, content }) => {
    const authorId = users.find(u => u.userName === author)?.id;
    if (!authorId) {
      alert("Seleccione un autor válido.");
      return;
    }
  
    fetch("http://localhost:8080/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorId, text: content }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al publicar el tweet');
        }
        return response.json();
      })
      .then(newTweet => {
        setTweets(prevTweets => [newTweet, ...prevTweets]);
        alert("Tweet publicado con éxito ✔");
        closeCreateTweetModal();
      })
      .catch(error => {
        console.error("Error:", error);
        alert(error.message || "No se pudo publicar el tweet.");
      });
  };

  const openCreateTweetModal = () => setCreateTweetModalOpen(true);
  const closeCreateTweetModal = () => setCreateTweetModalOpen(false);

  return (
    <div data-theme="mytheme">
      <BrowserRouter>
        <Routes>
          {/* Todas las rutas ahora están anidadas dentro del Layout */}
          <Route path="/" element={<AppLayout onNewTweetClick={openCreateTweetModal} users={users} tweets={tweets} setTweets={setTweets} />}>
            <Route index element={<Home tweets={tweets} setTweets={setTweets} users={users} />} />
            <Route path="user/:userId" element={<Home tweets={tweets} setTweets={setTweets} users={users} />} />
            <Route path="users" element={<UsersPage users={users} setUsers={setUsers} />} />
          </Route>
        </Routes>

        {isCreateTweetModalOpen && (
          <dialog id="create_tweet_modal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Crear un nuevo Tweet</h3>
              <CreateTweet onAdd={addTweet} onClose={closeCreateTweetModal} users={users} />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={closeCreateTweetModal}>close</button>
            </form>
          </dialog>
        )}
      </BrowserRouter>
    </div>
  );
}

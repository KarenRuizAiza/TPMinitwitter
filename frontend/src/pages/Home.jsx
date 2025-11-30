import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TweetCard from "../components/TweetCard";
import SidebarUsers from "../components/SidebarUsers";
import UserAvatar from "../components/UserAvatar";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Home({ tweets, setTweets, users = [] }) {
  const { userId } = useParams();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // Nuevos estados para controlar el modal de retweet
  const [isRetweetModalOpen, setRetweetModalOpen] = useState(false);
  const [tweetToRetweet, setTweetToRetweet] = useState(null);
  const [selectedRetweeter, setSelectedRetweeter] = useState("");

  // Function to refresh tweets after an action (like retweet)
  const refreshTweets = () => {
    setPage(0); // Reset to first page
    setTweets([]); // Clear current tweets
    setHasMore(true); // Assume there's more data to load
    // The useEffect will re-fetch based on the reset state
  };

  useEffect(() => {
    // Only fetch if hasMore is true, or if it's the initial load (page 0)
    // and we haven't already loaded some tweets for this userId context.
    if (!hasMore && page !== 0) return;

    const url = userId
      ? `http://localhost:8080/tweets/user/${userId}?page=${page}&size=15`
      : `http://localhost:8080/tweets?page=${page}&size=10`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTweets(data); // Siempre reemplaza los tweets con los de la página actual
        setHasMore(data.length === (userId ? 15 : 10));
      })
      .catch((error) => {
        console.error("Error fetching tweets:", error);
        setHasMore(false);
      });
  }, [page, userId, setTweets]); // Removed hasMore from dependency array to avoid infinite loop when setHasMore(false)

  // This useEffect ensures that when userId changes, we reset pagination and tweets.
  useEffect(() => {
    refreshTweets(); // Reset tweets and pagination when userId changes
  }, [userId]);


  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  // 1. Abre el modal y guarda el tweet que se va a retwittear
  const openRetweetModal = (tweet) => {
    setTweetToRetweet(tweet);
    setRetweetModalOpen(true);
  };

  // 2. Cierra el modal y limpia los estados
  const closeRetweetModal = () => {
    setRetweetModalOpen(false);
    setTweetToRetweet(null);
    setSelectedRetweeter("");
  };

  // 3. Ejecuta el retweet con el usuario seleccionado
  const handleRetweet = () => {
    if (!selectedRetweeter) {
      alert("Por favor, selecciona un usuario para retwittear.");
      return;
    }

    fetch("http://localhost:8080/tweets/retweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ retweeterId: selectedRetweeter, originalTweetId: tweetToRetweet.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al hacer retweet");
        }
        return response.json();
      })
      .then(() => {
        alert("Retweet realizado con éxito ✔");
        closeRetweetModal(); // Cierra el modal después del éxito
        refreshTweets(); // Refresh the tweet list to show the new retweet
      })
      .catch((error) => {
        console.error("Error al hacer retweet:", error);
        alert(error.message || "No se pudo realizar el retweet.");
      });
  };

  return (
    <div className="flex gap-6 p-6 max-w-screen-xl mx-auto">
      <div className="w-64 flex-shrink-0">
        <SidebarUsers users={users} />
      </div>

      <main className="flex-1">
        <div className="space-y-4 mt-6">
          {tweets && tweets.length > 0 ? (
            tweets.map((t, i) => (
              <TweetCard key={t.id || i} tweet={t} onRetweet={() => openRetweetModal(t)} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">No hay tweets para mostrar en este momento.</p>
          )}
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          {userId ? (
            <button
              className="btn btn-primary btn-sm text-white"
              disabled={!hasMore}
              onClick={handleShowMore}
            >
              {hasMore ? "Mostrar más" : "No hay más tweets"}
            </button>
          ) : (
            <>
              <button
                className="btn btn-ghost btn-sm"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                <FiChevronLeft />
                Anterior
              </button>

              <button className="btn btn-primary btn-sm text-white">
                Página {page + 1}
              </button>

              <button
                className="btn btn-ghost btn-sm"
                disabled={!hasMore}
                onClick={() => setPage(page + 1)}
              >
                Siguiente
                <FiChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Modal para seleccionar usuario para Retweet */}
        {isRetweetModalOpen && (
          <dialog id="retweet_modal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Retwittear como...</h3>
              
              <div className="py-4 space-y-4">
                {/* Selector de usuario */}
                <select
                  className="select select-bordered w-full"
                  value={selectedRetweeter}
                  onChange={(e) => setSelectedRetweeter(e.target.value)}
                >
                  <option disabled value="">
                    Selecciona un usuario
                  </option>
                  {users
                    // Filtramos para que el autor original no pueda retwittearse a sí mismo
                    .filter(user => user.id !== tweetToRetweet.author.id)
                    .map((u) => (
                      <option key={u.id} value={u.id}>{u.userName}</option>
                    ))
                  }
                </select>

                {/* Mostramos el tweet original como referencia */}
                <div className="text-sm text-gray-500 border rounded-lg p-2">
                  <p className="font-bold">{tweetToRetweet.author.userName}</p>
                  <p>{tweetToRetweet.text}</p>
                </div>
              </div>

              <div className="modal-action">
                <button onClick={closeRetweetModal} className="btn btn-ghost">Cancelar</button>
                <button onClick={handleRetweet} className="btn btn-primary text-white">Retwittear</button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={closeRetweetModal}>close</button>
            </form>
          </dialog>
        )}
      </main>
    </div>
  );
}

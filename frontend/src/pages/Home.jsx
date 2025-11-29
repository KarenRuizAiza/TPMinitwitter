import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TweetCard from "../components/TweetCard";
import SidebarUsers from "../components/SidebarUsers";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Home({ tweets, setTweets, users = [] }) {
  const { userId } = useParams();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(0);
    setTweets([]);
    setHasMore(true);
  }, [userId, setTweets]);

  useEffect(() => {
    if (!hasMore) return;

    const url = userId
      ? `http://localhost:8080/tweets/user/${userId}?page=${page}&size=15`
      : `http://localhost:8080/tweets?page=${page}&size=10`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTweets((prev) => (page === 0 ? data : [...prev, ...data]));
        setHasMore(data.length > 0);
      })
      .catch(() => setHasMore(false));
  }, [page, userId, setTweets, hasMore]);

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="flex gap-6 p-6 max-w-screen-xl mx-auto">
      <SidebarUsers users={users} />

      <main className="flex-1">
        <div className="space-y-4 mt-6">
          {tweets.map((t, i) => (
            <TweetCard key={i} tweet={t} />
          ))}
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
      </main>
    </div>
  );
}

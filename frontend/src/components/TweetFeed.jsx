import React, { useState, useEffect } from 'react';
import { getTweets, getUserTweets } from '../services/api';
import TweetItem from './TweetItem';
import { useAppContext } from '../context/AppContext';

const TweetFeed = ({ userId = null, mode = 'loadMore' }) => {
    const [tweets, setTweets] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const { refreshTrigger } = useAppContext();

    const pageSize = userId ? 15 : 10;

    const fetchTweets = async (pageNum, reset = false) => {
        setLoading(true);
        try {
            let data;
            if (userId) {
                data = await getUserTweets(userId, pageNum, pageSize);
            } else {
                data = await getTweets(pageNum, pageSize);
            }

            if (reset) {
                setTweets(data);
            } else {
                if (mode === 'loadMore') {
                    setTweets(prev => [...prev, ...data]);
                } else {
                    setTweets(data);
                }
            }

            if (data.length < pageSize) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (error) {
            console.error("Error fetching tweets:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(0);
        fetchTweets(0, true);
    }, [userId, refreshTrigger]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchTweets(nextPage);
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchTweets(nextPage, true);
    };

    const handlePrevPage = () => {
        if (page > 0) {
            const prevPage = page - 1;
            setPage(prevPage);
            fetchTweets(prevPage, true);
            setHasMore(true); // Assuming if we go back we can go forward again
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {tweets.map((tweet) => (
                <TweetItem key={`${tweet.id}-${tweet.originalTweetId ? 'rt' : 'tw'}`} tweet={tweet} />
            ))}

            {loading && <div className="flex justify-center p-4"><span className="loading loading-spinner loading-md"></span></div>}

            {!loading && tweets.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                    No hay tweets para mostrar.
                </div>
            )}

            {!loading && (
                <div className="flex justify-center mt-4 mb-8">
                    {mode === 'loadMore' ? (
                        tweets.length > 0 && (
                            hasMore ? (
                                <button className="btn btn-outline btn-primary rounded-full px-8" onClick={loadMore}>
                                    Mostrar más
                                </button>
                            ) : (
                                <span className="text-gray-400 italic">No hay más tweets...</span>
                            )
                        )
                    ) : (
                        <div className="join grid grid-cols-2">
                            <button
                                className="join-item btn btn-outline"
                                onClick={handlePrevPage}
                                disabled={page === 0}
                            >
                                Anterior
                            </button>
                            <button
                                className="join-item btn btn-outline"
                                onClick={handleNextPage}
                                disabled={!hasMore}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TweetFeed;

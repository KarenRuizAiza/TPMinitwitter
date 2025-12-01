import React from 'react';
import { useAppContext } from '../context/AppContext';
import { createRetweet } from '../services/api';


const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const TweetItem = ({ tweet }) => {
    const { currentUser, triggerRefresh } = useAppContext();
    const isRetweet = !!tweet.originalTweetId;

    // Map backend DTO to display format
    // Backend DTO: { id, text, author: {name, userName}, originalTweetId, originalAuthorUsername, originalTweetText }

    let displayTweet;
    let retweeter = null;

    if (isRetweet) {
        retweeter = tweet.author;
        displayTweet = {
            id: tweet.originalTweetId,
            content: tweet.originalTweetText,
            user: {
                name: tweet.originalAuthorUsername, // We only have username for original author in retweet DTO
                userName: tweet.originalAuthorUsername
            }
        };
    } else {
        displayTweet = {
            id: tweet.id,
            content: tweet.text,
            user: tweet.author
        };
    }

    const handleRetweet = async () => {
        if (!currentUser) return alert("Selecciona un usuario primero");
        try {
            await createRetweet(currentUser.id, displayTweet.id);
            triggerRefresh();
            alert("Retuit realizado correctamente");
        } catch (error) {
            console.error("Error retweeting:", error);
            alert("Error al retuitear, esta intentando dar retweet a un tweet que es suyo");
        }
    };

    return (
        <div className="card bg-base-100 shadow-sm mb-4 hover:bg-base-100/80 transition-colors">
            <div className="card-body p-4">
                {isRetweet && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M2.24 6.8a.75.75 0 001.06-.04l1.95-2.1v8.59a.75.75 0 001.5 0V4.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L2.2 5.74a.75.75 0 00.04 1.06zm8 6.4a.75.75 0 00-.04 1.06l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-1.5 0v8.59l-1.95-2.1a.75.75 0 00-1.06-.04z" clipRule="evenodd" />
                        </svg>
                        <span>{retweeter.name} Retwitteó</span>
                    </div>
                )}

                <div className="flex gap-3">
                    <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center">
                            <span className="text-lg">{displayTweet.user?.name?.charAt(0) || '?'}</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-bold text-base">{displayTweet.user?.name || 'Unknown'}</h3>
                            <span className="text-sm text-gray-500">@{displayTweet.user?.userName || 'unknown'}</span>
                            <span className="text-xs text-gray-400 ml-2">· {formatDate(tweet.creationDate)}</span>
                        </div>
                        {isRetweet && (
                            <p className="text-xs text-gray-400 mb-1">
                                Retwitteado el {formatDate(tweet.creationDate)}
                            </p>
                        )}
                        <p className="mt-1 text-gray-800">{displayTweet.content}</p>

                        <div className="card-actions justify-end mt-3">
                            <button
                                className="btn btn-ghost btn-xs gap-1 text-gray-500 hover:text-green-500"
                                onClick={handleRetweet}
                                title="Retweet"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                </svg>
                                Retweet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TweetItem;

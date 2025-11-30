import UserAvatar from "./UserAvatar";
import { FiRepeat } from "react-icons/fi";

export default function TweetCard({ tweet, onRetweet }) {
  const isRetweet = tweet.originalTweetId != null;

  return (
    <div className="card bg-base-100 p-4 rounded-2xl shadow-sm mb-4">
      {isRetweet && (
        <div className="flex items-center gap-2 text-sm text-base-content/70 mb-2">
          <FiRepeat />
          <span>{tweet.author.userName} ha retwitteado</span>
        </div>
      )}

      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          <UserAvatar name={tweet.author.userName} />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base-content">{tweet.author.userName}</span>
          </div>
          {isRetweet && tweet.text && <p className="mt-1 text-base-content">{tweet.text}</p>}

          {isRetweet ? (
            <div className="border border-base-content/20 rounded-lg p-3 mt-2">
              <div className="flex gap-2 items-start">
                <UserAvatar name={tweet.originalAuthorUsername} />
                <div className="flex-grow">
                  <span className="font-bold text-base-content">{tweet.originalAuthorUsername}</span>
                  <p className="mt-1 text-base-content/90">{tweet.originalTweetText}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-base-content">{tweet.text}</p>
          )}

          {!isRetweet && (
            <button
              className="flex items-center gap-2 text-base-content/60 hover:text-success mt-3"
              onClick={() => onRetweet(tweet.id)}
            >
              <FiRepeat className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import UserAvatar from "./UserAvatar";
import { FiRepeat } from "react-icons/fi";

export default function TweetCard({ tweet, onRetweet }) {
  const isRetweet = tweet.originalTweetId != null;

  return (
    <div className="bg-base-100 p-4 rounded-2xl shadow-sm mb-4">
      {isRetweet && (
        <div className="flex items-center gap-2 text-sm text-darkText mb-2">
          <FiRepeat />
          <span>{tweet.author.userName} ha retwitteado</span>
        </div>
      )}

      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          <UserAvatar name={isRetweet ? tweet.author.userName : tweet.author.userName} />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="font-bold">{tweet.author.userName}</span>
          </div>
          {isRetweet && tweet.text && <p className="mt-1">{tweet.text}</p>}

          {isRetweet ? (
            <div className="border border-gray-200 rounded-lg p-3 mt-2">
              <div className="flex gap-2 items-start">
                <UserAvatar name={tweet.originalAuthorUsername} />
                <div className="flex-grow">
                  <span className="font-bold">{tweet.originalAuthorUsername}</span>
                  <p className="mt-1">{tweet.originalTweetText}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-1">{tweet.text}</p>
          )}

          {!isRetweet && (
            <button
              className="btn btn-ghost btn-sm mt-2"
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


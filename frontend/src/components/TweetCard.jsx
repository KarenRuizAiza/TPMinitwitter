import UserAvatar from "./UserAvatar";
import { FiRepeat } from "react-icons/fi";

export default function TweetCard({ tweet }) {
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
          <UserAvatar name={isRetweet ? tweet.originalAuthorUsername : tweet.author.userName} />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="font-bold">{isRetweet ? tweet.originalAuthorUsername : tweet.author.userName}</span>
          </div>
          <p className="mt-1">{tweet.text}</p>
        </div>
      </div>
    </div>
  );
}

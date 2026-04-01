import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CommentModal from "./CommentModal";
import Button from "./common/Button";

interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  isVerified: boolean;
}

interface TweetProps {
  tweet: {
    id: string;
    content: string;
    createdAt: string;
    author: Author;
    _count?: {
      likes: number;
      replies: number;
    };
  };
}

const TweetCard = ({ tweet }: TweetProps) => {
  const { author, content, createdAt, _count } = tweet;
  const { user } = useAuth();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCommentModalOpen(true);
  };

  return (
    <div className="flex gap-3 p-4 border-b border-gray-800 hover:bg-white/5 transition-colors cursor-pointer">
      <Link to={`/${author.username}`}>
        <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden flex-shrink-0">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-bold uppercase text-white">
              {author.name[0]}
            </div>
          )}
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-[15px] mb-0.5">
          <Link
            to={`/${author.username}`}
            className="font-bold hover:underline truncate"
          >
            {author.name}
          </Link>
          {author.isVerified && (
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] fill-twitter-blue flex-shrink-0"
            >
              <g>
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.28 2.52-.81 3.91c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2l-3.53-3.53 1.41-1.41 2.12 2.12 4.96-4.96 1.41 1.41-6.37 6.37z"></path>
              </g>
            </svg>
          )}
          <span className="text-gray-500 truncate">@{author.username}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500 flex-shrink-0">
            {formatTime(createdAt)}
          </span>
        </div>

        <p className="text-[15px] text-white leading-normal break-words">
          {content}
        </p>

        <div className="flex justify-between mt-3 max-w-md text-gray-500">
          <Button
            onClick={onButtonClick}
            className="group flex items-center gap-2 hover:text-twitter-blue transition-colors"
            svgIcon={
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] fill-current"
              >
                <g>
                  <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.244c4.421 0 8.005 3.58 8.005 8 0 4.417-3.584 8.001-8.005 8.001H6.304l-4.553 4.554V10zm2 0v9.447l2.844-2.845H13.99c3.313 0 6.005-2.69 6.005-6 0-3.312-2.692-6-6.005-6H9.756c-3.311 0-6.005 2.688-6.005 6z"></path>
                </g>
              </svg>
            }
            content={_count?.replies || 0}
          />
          <Button
            onClick={onButtonClick}
            className="group flex items-center gap-2 hover:text-green-500 transition-colors"
            svgIcon={
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] fill-current"
              >
                <g>
                  <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 20.12l-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14z"></path>
                </g>
              </svg>
            }
            content={_count?.likes || 0}
          />
          <Button
            onClick={onButtonClick}
            className="group flex items-center gap-2 hover:text-twitter-blue transition-colors"
            svgIcon={
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] fill-current"
              >
                <g>
                  <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.29 3.3-1.42-1.42 5.71-5.7zM5 21v-2h14v2H5z"></path>
                </g>
              </svg>
            }
            content={_count?.likes || 0}
          />
        </div>
      </div>

      <CommentModal
        tweet={tweet}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default TweetCard;

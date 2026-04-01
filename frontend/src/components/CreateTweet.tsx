import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tweetsApi } from "../api/tweetsApi";
import { useAuth } from "../hooks/useAuth";

const CreateTweet = () => {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (content: string) => tweetsApi.createTweet(content),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && content.length <= 280) {
      mutation.mutate(content);
    }
  };

  return (
    <div className="p-4 border-b border-gray-800 flex gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden flex-shrink-0">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-lg font-bold uppercase text-white">
            {user?.name?.[0] || "?"}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex-1">
        <textarea
          className="w-full bg-transparent text-xl placeholder-gray-500 focus:outline-none resize-none min-h-[100px]"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-900">
          <div className="flex text-twitter-blue">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-twitter-blue/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <g>
                  <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                </g>
              </svg>
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-twitter-blue/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <g>
                  <path d="M19 10.5V8.8h-4.4c-.4 0-.8.3-.8.8s.3.8.8.8H19zm0 3.5V12.3h-4.4c-.4 0-.8.3-.8.8s.3.8.8.8H19zM5 19h14c.4 0 .8-.3.8-.8s-.3-.8-.8-.8H5c-.4 0-.8.3-.8.8s.3.8.8.8zm0-4.8h4.4c.4 0 .8-.3.8-.8s-.3-.8-.8-.8H5c-.4 0-.8.3-.8.8s.3.8.8.8zm0-3.5h4.4c.4 0 .8-.3.8-.8s-.3-.8-.8-.8H5c-.4 0-.8.3-.8.8s.3.8.8.8zm0-3.5h4.4c.4 0 .8-.3.8-.8s-.3-.8-.8-.8H5c-.4 0-.8.3-.8.8s.3.8.8.8z"></path>
                </g>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {content.length > 0 && (
              <span
                className={`text-sm ${content.length > 280 ? "text-red-500" : "text-gray-500"}`}
              >
                {280 - content.length}
              </span>
            )}
            <button
              disabled={
                !content.trim() || content.length > 280 || mutation.isPending
              }
              className="bg-twitter-blue text-white px-4 py-1.5 rounded-full font-bold hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {mutation.isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;

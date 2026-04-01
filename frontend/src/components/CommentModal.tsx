import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tweetsApi } from '../api/tweetsApi';

interface Author {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    isVerified: boolean;
}

interface Tweet {
    id: string;
    content: string;
    createdAt: string;
    author: Author;
}

interface CommentModalProps {
    tweet: Tweet;
    isOpen: boolean;
    onClose: () => void;
    user: any; // Current logged in user
}

const CommentModal: React.FC<CommentModalProps> = ({ tweet, isOpen, onClose, user }) => {
    const [content, setContent] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ content, parentTweetId }: { content: string; parentTweetId: string }) =>
            tweetsApi.createTweet(content, parentTweetId),
        onSuccess: () => {
            setContent('');
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['tweet', tweet.id] });
            onClose();
        },
    });

    const handleReply = () => {
        if (content.trim() && content.length <= 280) {
            mutation.mutate({ content, parentTweetId: tweet.id });
        }
    };

    if (!isOpen) return null;

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-black w-full max-w-xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center px-4 py-2 sticky top-0 bg-black z-10">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-900 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                            <g><path d="M10.586 12L4.293 5.707l1.414-1.414L12 10.586l6.293-6.293 1.414 1.414L13.414 12l6.293 6.293-1.414 1.414L12 13.414l-6.293 6.293-1.414-1.414L10.586 12z"></path></g>
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {/* Parent Tweet Thread Line Container */}
                    <div className="flex gap-3 relative">
                        {/* Thread Line */}
                        <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-800"></div>

                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden flex-shrink-0 z-10">
                            {tweet.author.avatar ? (
                                <img src={tweet.author.avatar} alt={tweet.author.username} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg font-bold uppercase text-white">
                                    {tweet.author.name[0]}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pb-6">
                            <div className="flex items-center gap-1 text-[15px]">
                                <span className="font-bold text-white truncate">{tweet.author.name}</span>
                                {tweet.author.isVerified && (
                                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-twitter-blue flex-shrink-0">
                                        <g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.28 2.52-.81 3.91c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2l-3.53-3.53 1.41-1.41 2.12 2.12 4.96-4.96 1.41 1.41-6.37 6.37z"></path></g>
                                    </svg>
                                )}
                                <span className="text-gray-500 truncate">@{tweet.author.username}</span>
                                <span className="text-gray-500">·</span>
                                <span className="text-gray-500 flex-shrink-0">{formatTime(tweet.createdAt)}</span>
                            </div>
                            <p className="text-[15px] text-white leading-normal mt-1 break-words">
                                {tweet.content}
                            </p>
                            <div className="mt-4 text-sm">
                                <span className="text-gray-500">Replying to </span>
                                <span className="text-twitter-blue">@{tweet.author.username}</span>
                            </div>
                        </div>
                    </div>

                    {/* Reply Area */}
                    <div className="flex gap-3 mt-2">
                        {/* Current User Avatar */}
                        <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden flex-shrink-0 z-10">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg font-bold uppercase text-white">
                                    {user?.name?.[0] || '?'}
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="flex-1 flex flex-col">
                            <textarea
                                autoFocus
                                className="w-full bg-transparent text-xl placeholder-gray-500 focus:outline-none resize-none min-h-[120px] pt-1"
                                placeholder="Post your reply"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end items-center px-4 py-3 border-t border-gray-800">
                    <button
                        disabled={!content.trim() || content.length > 280 || mutation.isPending}
                        className="bg-twitter-blue text-white px-5 py-1.5 rounded-full font-bold hover:bg-blue-600 transition-colors disabled:opacity-50"
                        onClick={handleReply}
                    >
                        {mutation.isPending ? 'Posting...' : 'Reply'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;

import { useQuery } from '@tanstack/react-query';
import { tweetsApi } from '../api/tweetsApi';
import TweetCard from './TweetCard';
import CreateTweet from './CreateTweet';

const Timeline = () => {
    const { data: tweets, isLoading, isError, refetch } = useQuery({
        queryKey: ['feed'],
        queryFn: tweetsApi.getFeed,
    });

    return (
        <div className="min-h-screen">
            <header className="sticky top-0 bg-black/80 backdrop-blur-md z-10 py-4 px-4 border-b border-gray-800">
                <h1 className="text-xl font-bold">Home</h1>
            </header>

            <CreateTweet />

            {isLoading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-twitter-blue"></div>
                </div>
            ) : isError ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">Failed to load feed</p>
                    <button onClick={() => refetch()} className="text-twitter-blue mt-2 hover:underline">Try again</button>
                </div>
            ) : tweets && tweets.length > 0 ? (
                <div>
                    {tweets.map((tweet: any) => (
                        <TweetCard key={tweet.id} tweet={tweet} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold mb-2">Welcome to VOXO!</h2>
                    <p className="text-gray-500">This is where you'll see posts from people you follow. Start by sharing your first thought!</p>
                </div>
            )}
        </div>
    );
};

export default Timeline;

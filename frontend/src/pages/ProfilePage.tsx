import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserByUsername } from '../api/userApi';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    const { data: profileUser, isLoading, isError } = useQuery({
        queryKey: ['profile', username],
        queryFn: () => getUserByUsername(username!),
        enabled: !!username,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-twitter-blue"></div>
            </div>
        );
    }

    if (isError || !profileUser) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold">User not found</h2>
                <button onClick={() => navigate('/')} className="mt-4 text-twitter-blue hover:underline">Go back home</button>
            </div>
        );
    }

    const isOwnProfile = currentUser?.username === profileUser.username;

    return (
        <div className="min-h-screen border-x border-gray-800">
            {/* Header */}
            <header className="sticky top-0 bg-black/80 backdrop-blur-md z-20 px-4 py-1 flex items-center gap-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-900 transition-colors"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                        <g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g>
                    </svg>
                </button>
                <div>
                    <h1 className="text-xl font-bold">{profileUser.name}</h1>
                    <p className="text-sm text-gray-500">{profileUser.tweetsCount} Tweets</p>
                </div>
            </header>

            {/* Banner */}
            <div className="h-48 bg-gray-800 relative">
                {profileUser.backgroundImage && (
                    <img src={profileUser.backgroundImage} alt="Banner" className="w-full h-full object-cover" />
                )}
            </div>

            {/* Profile Info Section */}
            <div className="px-4 pb-4">
                <div className="flex justify-between items-start -mt-16 relative z-10">
                    <div className="w-32 h-32 rounded-full border-4 border-black bg-blue-500 overflow-hidden">
                        {profileUser.avatar ? (
                            <img src={profileUser.avatar} alt={profileUser.username} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold uppercase">
                                {profileUser.name[0]}
                            </div>
                        )}
                    </div>
                    <div className="mt-20">
                        {isOwnProfile ? (
                            <button className="px-4 py-1.5 rounded-full border border-gray-600 font-bold hover:bg-gray-900 transition-colors">
                                Edit profile
                            </button>
                        ) : (
                            x < button className={`px-4 py-1.5 rounded-full font-bold transition-colors ${profileUser.isFollowing
                                ? 'border border-gray-600 hover:border-red-600 hover:text-red-600 hover:after:content-["Unfollow"] after:content-["Following"]'
                                : 'bg-white text-black hover:bg-gray-200'
                                }`}>
                        {profileUser.isFollowing ? '' : 'Follow'}
                    </button>
                        )}
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-bold flex items-center gap-1">
                    {profileUser.name}
                    {profileUser.isVerified && (
                        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-twitter-blue">
                            <g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.28 2.52-.81 3.91c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2l-3.53-3.53 1.41-1.41 2.12 2.12 4.96-4.96 1.41 1.41-6.37 6.37z"></path></g>
                        </svg>
                    )}
                </h2>
                <p className="text-gray-500 text-sm">@{profileUser.username}</p>
            </div>

            {profileUser.bio && (
                <p className="mt-3 whitespace-pre-wrap">{profileUser.bio}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-gray-500 text-sm">
                {profileUser.location && (
                    <div className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                            <g><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.661 11.053 7.99 11.27l.51.34.51-.34c.328-.217 7.99-5.303 7.99-11.27 0-4.687-3.813-8.5-8.5-8.5zm0 17.393c-1.844-1.321-6.5-5.109-6.5-8.893 0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5c0 3.784-4.656 7.572-6.5 8.893z"></path></g>
                        </svg>
                        {profileUser.location}
                    </div>
                )}
                {profileUser.website && (
                    <div className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                            <g><path d="M11.96 14.945c-.007-.001-.014-.003-.022-.003L12 14.94l-.022.003c-.008 0-.015.002-.022.003l-4.485.45-1.25-11.394 5.753-1.44c.01-.002.019-.003.028-.005L12 2.556l-.022.003c-.01 0-.018.003-.028.005l5.753 1.44-1.25 11.394-4.485-.45c-.004-.001-.008-.001-.012-.002zM12 4.595l-4.042 1.01 1.01 9.208 3.032-.304V4.595zm1 0v9.914l3.032.304 1.01-9.208L13 4.595zM4.32 17.062l-.723-6.582-1.353.338c-.01.002-.02.004-.029.006L2 10.83l.022-.006c.01 0 .019-.004.029-.006l.302-.075 1.536 13.985 6.888-1.722c.01-.002.019-.003.028-.005L11 22.996l-.022.005c-.01 0-.018.003-.028.005l-6.63 1.657V12.062zM22 10.83l-.216-.006c-.01 0-.019.004-.029.006L20.4 11.17l-.723 6.582V24.663l-6.63-1.657c-.01-.002-.019-.003-.028-.005L13 22.996l-.022-.005c-.01 0-.018.003-.028.005l6.888 1.722 1.536-13.985.302.075c.01.002.019.004.029.006l.317.006z"></path></g>
                        </svg>
                        <a href={profileUser.website} target="_blank" rel="noreferrer" className="text-twitter-blue hover:underline">
                            {profileUser.website.replace(/^https?:\/\//, '')}
                        </a>
                    </div>
                )}
                <div className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                        <g><path d="M7 4V3h2v1h6V3h2v1h1.5C19.88 4 21 5.12 21 6.5v12c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2z"></path></g>
                    </svg>
                    Joined {new Date(profileUser.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
            </div>

            <div className="mt-3 flex gap-4 text-sm">
                <button className="hover:underline">
                    <span className="font-bold text-white">{profileUser.followingCount}</span>
                    <span className="text-gray-500 ml-1">Following</span>
                </button>
                <button className="hover:underline">
                    <span className="font-bold text-white">{profileUser.followersCount}</span>
                    <span className="text-gray-500 ml-1">Followers</span>
                </button>
            </div>
        </div>

            {/* Tabs */ }
    <div className="flex border-b border-gray-800">
        {['Tweets', 'Replies', 'Highlights', 'Media', 'Likes'].map((tab, idx) => (
            <button
                key={tab}
                className={`flex-1 py-4 text-sm font-bold hover:bg-gray-900 transition-colors relative ${idx === 0 ? 'text-white' : 'text-gray-500'}`}
            >
                {tab}
                {idx === 0 && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-twitter-blue rounded-full"></div>
                )}
            </button>
        ))}
    </div>

    {/* Content Area Placeholder */ }
    <div className="py-20 text-center text-gray-500">
        <p className="text-lg">No tweets yet.</p>
    </div>
        </div >
    );
};

export default ProfilePage;

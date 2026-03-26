import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SidebarItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 p-3 rounded-full hover:bg-gray-900 transition-colors w-max xl:w-full ${
        isActive ? 'font-bold' : ''
      }`
    }
  >
    <div className="text-2xl">{icon}</div>
    <span className="text-xl hidden xl:block">{label}</span>
  </NavLink>
);

const Sidebar = () => {
    const { user, logout } = useAuth();

    const menuItems = [
        {
            to: '/',
            label: 'Home',
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
                    <g><path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.346L3 9.141V22h18V9.141l1.318 1.012 1.06-1.346L12 1.696zM19 20H5V7.571l7-5.369 7 5.369V20z"></path></g>
                </svg>
            ),
        },
        {
            to: '/explore',
            label: 'Explore',
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
                    <g><path d="M11 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2zm0 2a8 8 0 100 16 8 8 0 000-16zM5.312 12.63l1.848-1.503 1.127 4.198-2.975-2.695zm11.376-1.26l-1.848 1.503-1.127-4.198 2.975 2.695zm-3.13 2.58l-1.558 1.844-1.844-1.558 1.558-1.844 1.844 1.558z"></path></g>
                </svg>
            ),
        },
        {
            to: '/notifications',
            label: 'Notifications',
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
                    <g><path d="M1.374 15.688c-.378-.454-.537-1.15-.349-1.802l.66-2.288c.277-2.661 2.544-4.706 5.253-4.706h.143V5.558c0-2.317 1.878-4.195 4.195-4.195s4.195 1.878 4.195 4.195v1.334h.143c2.709 0 4.976 2.045 5.253 4.706l.66 2.288c.188.652.029 1.348-.349 1.802-.379.454-1.019.704-1.751.704H20v-.006c0 4.42-3.58 8-8 8s-8-3.58-8-8v.006H3.125c-.732 0-1.372-.25-1.751-.704zM12 3.363c-1.209 0-2.195.986-2.195 2.195v1.439h4.39V5.558c0-1.209-.986-2.195-2.195-2.195zM6.417 14.382h11.166l-.504-1.748C16.822 10.358 14.618 8.91 12.143 8.91h-.286c-2.475 0-4.679 1.448-4.936 3.724l-.504 1.748zM12 21.637c3.314 0 6-2.686 6-6h-12c0 3.314 2.686 6 6 6z"></path></g>
                </svg>
            ),
        },
        {
            to: '/messages',
            label: 'Messages',
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
                    <g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 4.444 8-4.444V5.5c0-.276-.224-.5-.5-.5h-15zm15 14c.276 0 .5-.224 .5-.5V10.336l-8 4.444-8-4.444V18.5c0 .276.224.5.5.5h15z"></path></g>
                </svg>
            ),
        },
        {
            to: '/bookmarks',
            label: 'Bookmarks',
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
                    <g><path d="M4 4.5C4 3.12 5.12 2 6.5 2h11C18.88 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.28 0-.5.22-.5.5v15.44l6-4.29 6 4.29V4.5c0-.28-.22-.5-.5-.5h-11z"></path></g>
                </svg>
            ),
        },
        {
            to: `/${user?.username}`,
            label: 'Profile',
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
                    <g><path d="M5.651 20.257c.353-.408.964-.516 1.422-.244.606.355 1.637.743 2.927.743 1.29 0 2.321-.388 2.927-.743.458-.272 1.069-.164 1.422.244.305.353.305.897 0 1.25-.972 1.123-2.531 1.743-4.349 1.743s-3.377-.62-4.349-1.743c-.305-.353-.305-.897 0-1.25zm8.107-5.32c1.3-.39 2.353-1.422 2.744-2.722.396-1.32.062-2.716-.906-3.71-.97-.993-2.316-1.341-3.636-.945-1.31.396-2.353 1.422-2.744 2.742-.396 1.32-.062 2.716.906 3.71.97.993 2.316 1.341 3.636.945zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z"></path></g>
                </svg>
            ),
        },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 xl:w-64 flex flex-col items-center xl:items-start px-4 py-2 border-r border-gray-800 bg-black z-50">
            {/* Logo */}
            <div className="p-3 mb-2 rounded-full hover:bg-gray-900 transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
                    <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
                </svg>
            </div>

            {/* Nav Menu */}
            <nav className="flex-1 w-full space-y-1">
                {menuItems.map((item) => (
                    <SidebarItem key={item.to} {...item} />
                ))}
                
                {/* More Button */}
                <button className="flex items-center gap-4 p-3 rounded-full hover:bg-gray-900 transition-colors w-max xl:w-full">
                    <div className="text-2xl">
                        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
                            <g><path d="M13.5 12c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm-6 0c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm12 0c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5z"></path></g>
                        </svg>
                    </div>
                    <span className="text-xl hidden xl:block">More</span>
                </button>
            </nav>

            {/* Post Button */}
            <button className="w-12 h-12 xl:w-full xl:h-auto xl:py-3 bg-[#1DA1F2] rounded-full font-bold text-white hover:bg-opacity-90 transition-colors mb-4 flex items-center justify-center">
                <span className="hidden xl:block text-lg">Post</span>
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white xl:hidden">
                    <g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H14.5V11zm-2.5 0h-1.5v2H12V11zM11 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
                </svg>
            </button>

            {/* User Profile Summary */}
            <div 
                className="mt-auto w-full p-3 flex items-center gap-3 rounded-full hover:bg-gray-900 transition-colors cursor-pointer group relative"
                onClick={() => logout()}
            >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold overflow-hidden text-sm">
                    {user?.avatar ? <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" /> : user?.name?.[0].toUpperCase()}
                </div>
                <div className="hidden xl:block flex-1 min-w-0 text-sm">
                    <p className="font-bold truncate">{user?.name}</p>
                    <p className="text-gray-500 truncate">@{user?.username}</p>
                </div>
                <div className="hidden xl:block">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                        <g><path d="M13.5 12c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm-6 0c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm12 0c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5z"></path></g>
                    </svg>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

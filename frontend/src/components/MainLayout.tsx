import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Sidebar - fixed width on desktop */}
      <div className="w-20 xl:w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl border-x border-gray-800 min-h-screen">
          <Outlet />
        </div>

        {/* Right Sidebar - Widgets (Placeholder) */}
        <div className="hidden lg:block w-80 xl:w-96 px-4 py-2">
          <div className="bg-twitter-dark-gray rounded-2xl p-4 sticky top-2">
            <h2 className="text-xl font-bold mb-4">What's happening</h2>
            <p className="text-gray-500">Trending topics will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

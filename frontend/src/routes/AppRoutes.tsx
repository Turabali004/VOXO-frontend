import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../components/MainLayout";
import ProfilePage from "../pages/ProfilePage";

// Placeholder Home component
const HomePage = () => (
  <div className="p-4">
    <header className="sticky top-0 bg-black/80 backdrop-blur-md z-10 py-4 border-b border-gray-800">
      <h1 className="text-xl font-bold">Home</h1>
    </header>
    <div className="py-20 text-center">
      <h2 className="text-4xl font-bold">Welcome to VOXO</h2>
      <p className="mt-4 text-gray-500 text-lg">Your chronological timeline will appear here.</p>
    </div>
  </div>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:username" element={<ProfilePage />} />
        {/* Add more protected routes here */}
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
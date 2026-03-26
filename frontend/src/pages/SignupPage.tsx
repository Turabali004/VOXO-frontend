import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signup(formData);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create account. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Twitter Logo */}
                <div className="flex justify-center mb-10">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 fill-white" aria-hidden="true">
                        <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold mb-8">Create your account</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-700 rounded p-4 text-white focus:border-blue-500 outline-none transition-colors"
                        required
                    />

                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-700 rounded p-4 text-white focus:border-blue-500 outline-none transition-colors"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-700 rounded p-4 text-white focus:border-blue-500 outline-none transition-colors"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-700 rounded p-4 text-white focus:border-blue-500 outline-none transition-colors"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3 rounded-full mt-6 hover:bg-gray-200 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-10 text-gray-500 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

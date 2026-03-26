import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';

const LoginPage = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChnage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email: inputs.email, password: inputs.password });
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Twitter Logo (Simplified SVG) */}
                <div className="flex justify-center mb-10">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 fill-white" aria-hidden="true">
                        <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold mb-8">Sign in to VOXO</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={inputs.email}
                            name='email'
                            // onChange={(e) => setEmail(e.target.value)}
                            onChange={handleChnage}
                            className="w-full bg-black border border-gray-700 rounded p-4 text-white focus:border-blue-500 outline-none transition-colors"
                            required
                        />
                        {/* <input
                            type="email"
                            placeholder="Email"
                            value={inputs.email}
                            name='email'
                            // onChange={(e) => setEmail(e.target.value)}
                            onChange={handleChnage}
                            className="w-full bg-black border border-gray-700 rounded p-4 text-white focus:border-blue-500 outline-none transition-colors"
                            required
                        /> */}
                    </div>

                    <div className="space-y-1">
                        <input
                            type="password"
                            placeholder="Password"
                            value={inputs.password}
                            name='password'
                            // onChange={(e) => setPassword(e.target.value)}
                            onChange={handleChnage}
                            className="w-full bg-black border border-gray-700 rounded p-4 text-white focus:border-blue-500 outline-none transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-10 text-gray-500 text-center">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

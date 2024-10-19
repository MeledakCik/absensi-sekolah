"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // State untuk loading

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Setelah selesai loading, ubah state
        }, 2000);
        return () => {
            clearTimeout(timer);
        }; // Cleanup interval dan timer saat komponen di-unmount
    },);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    const handleLogin = (e) => {
        e.preventDefault();
        // Implementasi logika login di sini (misalnya, panggil API untuk autentikasi)
        console.log("Username:", username, "Password:", password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url("/background-login.jpg")' }}
        >
            <div className="w-full max-w-sm bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-6">
                <h2 className="text-[24px] font-bold text-white text-center">Login</h2>
                <form onSubmit={handleLogin} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Masukkan username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-[52px] transform -translate-y-1/2"
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 text-gray-700"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M10 3a7 7 0 100 14 7 7 0 000-14zM9 7a1 1 0 012 0v4a1 1 0 01-2 0V7z" />
                                    <path fillRule="evenodd" d="M14.707 14.707a1 1 0 01-1.414 0l-3.293-3.293a1 1 0 010-1.414l3.293-3.293a1 1 0 011.414 1.414l-3.293 3.293 3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 text-gray-700"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a7 7 0 100 14 7 7 0 000-14zM10 5a5 5 0 100 10 5 5 0 000-10zM9 7a1 1 0 112 0v4a1 1 0 01-2 0V7z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                            Lupa Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-black font-bold">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-[16px] text-blue-500 hover:underline">
                            Daftar Sekarang
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

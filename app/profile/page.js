"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Profile() {
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
    return (
        <div className="min-h-full flex flex-col items-center justify-center bg-white">
            <div className="w-full max-w-sm bg-white overflow-auto">
                <div className="bg-blue-500 p-4 text-white flex items-center justify-center">
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="rounded-full border-2 border-white w-[100px] h-[100px]"
                    />
                </div>
                <div className="p-4 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Alya Anggrnii</h2>
                    <p className="text-gray-500">Siswa SMKN</p>
                    <p className="mt-2 text-gray-600">
                        Profil saya mencakup informasi pribadi, jadwal kehadiran, dan aktivitas terbaru.
                    </p>
                </div>
                <div className="mt-4">
                    <div className="bg-gray-50 p-4">
                        <p className="font-semibold text-gray-600">Informasi Absensi Terakhir</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-500">Thursday, 29 Dec 2022</p>
                            <p className="text-sm text-gray-500">11:01:54 WITA</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-4 grid grid-cols-1 gap-4">
                    <Link href="#">
                        <div className="bg-green-100 p-3 rounded-lg text-center">
                            <i className="fas fa-sign-in-alt text-green-500 text-2xl mb-2"></i>
                            <p className="text-sm font-semibold text-gray-700">Absen Datang</p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className="bg-red-100 p-3 rounded-lg text-center">
                            <i className="fas fa-sign-out-alt text-red-500 text-2xl mb-2"></i>
                            <p className="text-sm font-semibold text-gray-700">Absen Pulang</p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className="bg-blue-100 p-3 rounded-lg text-center">
                            <i className="fas fa-calendar-alt text-blue-500 text-2xl mb-2"></i>
                            <p className="text-sm font-semibold text-gray-700">Jadwal Saya</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="bg-blue-500 p-3 fixed bottom-0 left-0 right-0 flex justify-around items-center text-white w-full max-w-sm mx-auto">
                <Link href="./dashboard/home">
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2 3 3 3-3 2 2 3-3 2 2 3-3 2 2" />
                        </svg>
                        <p className="mt-1 text-sm">Home</p>
                    </div>
                </Link>
                <Link href="./dashboard/absen">
                    <div className="flex flex-col items-center">
                        <div className="bg-white rounded-full p-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7v-7H5v7m0-7v7" />
                            </svg>
                        </div>
                        <p className="text-sm">Absensi</p>
                    </div>
                </Link>
                <Link href="./profile">
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16c3.313 0 6 2.687 6 6v1H6v-1c0-3.313 2.687-6 6-6z" />
                        </svg>
                        <p className="mt-1 text-sm">Profil</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

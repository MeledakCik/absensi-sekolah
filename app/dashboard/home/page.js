"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import Link from 'next/link';

export default function Home() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('id-ID', options);
    const attendanceDate = new Date('2024-10-15T08:00:00');
    const [hoursSinceAttendance, setHoursSinceAttendance] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // State untuk loading

    useEffect(() => {
        // Simulasi loading selama 2 detik
        const timer = setTimeout(() => {
            setIsLoading(false); // Setelah selesai loading, ubah state
        }, 2000);

        const calculateHoursSinceAttendance = () => {
            const now = new Date();
            const diffInMilliseconds = now - attendanceDate;
            const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
            setHoursSinceAttendance(diffInHours);
        };

        calculateHoursSinceAttendance();
        const intervalId = setInterval(calculateHoursSinceAttendance, 60 * 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(intervalId);
        }; // Cleanup interval dan timer saat komponen di-unmount
    }, [attendanceDate]);

    // Animasi loading (sederhana menggunakan CSS)
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-full flex flex-col items-center justify-center">
            <div className="max-w-md bg-white overflow-auto">
                <div className="bg-blue-400 text-red-500 p-9 rounded-b-[10px]">
                    <div className="grid grid-cols-3 mb-11 items-center">
                        <div className="col-span-2 text-left">
                            <p className="font-bold text-white text-[18px]">Alya Anggrnii</p>
                            <p className="font-bold text-white text-[14px]">Murid Siswa SMK</p>
                        </div>
                        <div className="col-span-1 flex justify-end">
                            <img
                                src="/profile.jpg"
                                alt="Profile"
                                className="rounded-full border-2 border-gray-300 shadow-sm w-[90px] h-[90px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-blue-300 p-9 ml-4 mr-4 rounded-lg -mt-16">
                    <div className='flex flex-col justify-between'>
                        <p className="text-white font-bold text-[16px] mb-4">Today : {formattedDate}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                            <img src="https://via.placeholder.com/30/4CAF50/FFFFFF?text=In" alt="Icon Pintu Masuk" className="mr-4" />
                            <div>
                                <p className="font-bold text-gray-800">Check In</p>
                                <p className="font-bold text-green-600 text-[13px]">08:00 AM</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                            <img src="https://via.placeholder.com/30/F44336/FFFFFF?text=Out" alt="Icon Pintu Keluar" className="mr-4" />
                            <div>
                                <p className="font-bold text-gray-800">Check Out</p>
                                <p className="font-bold text-red-600 text-[13px]">05:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative p-2  max-h-[400px]">
                    <div className="mt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="../absensi/">
                                <div className="flex items-center bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-green-500 mr-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div>
                                        <p className="font-bold">Absensi</p>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex items-center bg-white p-4 rounded shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
                                </svg>
                                <div>
                                    <p className="font-bold">History</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white p-4 rounded shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v14a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6" />
                                </svg>
                                <div>
                                    <p className="font-bold">Data</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white p-4 rounded shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-6 9h6m2 0h-2a2 2 0 01-2-2V9m-4 10h6a2 2 0 002-2v-2m-8 2H7a2 2 0 01-2-2V9" />
                                </svg>
                                <div>
                                    <p className="font-bold">Kalender</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white p-4 rounded shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <p className="font-bold">Aktivitas</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white p-4 rounded shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-6 9h6m2 0h-2a2 2 0 01-2-2V9m-4 10h6a2 2 0 002-2v-2m-8 2H7a2 2 0 01-2-2V9" />
                                </svg>
                                <div>
                                    <p className="font-bold">Jadwal Pelajaran</p>
                                </div>
                            </div>
                        </div>
                        <div className='border-b border-gray-200 mt-7'></div>
                        <div className="mt-6 mb-4">
                            <div className="flex justify-between items-center">
                                <div className='flex relative'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 mt-1 w-5 h-5 text-gray-600" // Ukuran dan warna ikon
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3"
                                        />
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
                                    </svg>
                                    <p className='text-black font-bold text-lg'>Absensi</p>
                                </div>
                                <button className="text-blue-600 font-medium">View All</button>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-5">
                                <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[14px] font-bold">
                                            {attendanceDate.toLocaleDateString('id-ID', { weekday: 'long' })}, {attendanceDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <p className="text-[14px] p-1 font-bold bg-gray-200 text-blue-400">Present</p>
                                    </div>
                                    <div className="flex space-x-4 mt-2">
                                        <div className="flex-1 flex items-center bg-white border border-gray-200 p-5 rounded shadow-lg">
                                            <img
                                                src="https://via.placeholder.com/30/4CAF50/FFFFFF?text=In"
                                                alt="Icon Pintu Masuk"
                                                className="mr-4"
                                            />
                                            <div>
                                                <p className="font-bold text-gray-800">Check In</p>
                                                <p className="font-bold text-green-600 text-[13px]">08:00 AM</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center bg-white border border-gray-200 p-5 rounded shadow-lg">
                                            <img
                                                src="https://via.placeholder.com/30/F44336/FFFFFF?text=Out"
                                                alt="Icon Pintu Keluar"
                                                className="mr-4"
                                            />
                                            <div>
                                                <p className="font-bold text-gray-800">Check Out</p>
                                                <p className="font-bold text-red-600 text-[13px]">05:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-400 p-3 fixed bottom-0 left-0 right-0 flex justify-around items-center text-white max-w-md mx-auto rounded-t-lg">
                    <div className="flex flex-col items-center text-center">
                        <Link href="../dashboard/home">
                            <p className="flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2 3 3 3-3 2 2 3-3 2 2 3-3"
                                    />
                                </svg>
                                <p className="mt-1">Home</p>
                            </p>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Link href="../dashboard/absen">
                            <p className="flex flex-col items-center">
                                <div className="bg-white rounded-full p-2 mb-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-blue-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 12h14m-7 7v-7H5v7m0-7v7"
                                        />
                                    </svg>
                                </div>
                                <p>Absensi</p>
                            </p>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Link href="../profile">
                            <p className="flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 14c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 16c3.313 0 6 2.687 6 6v1H6v-1c0-3.313 2.687-6 6-6z"
                                    />
                                </svg>
                                <p className="mt-1">Profil</p>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

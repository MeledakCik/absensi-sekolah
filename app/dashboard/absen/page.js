"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
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
        <div className="min-h-full flex flex-col items-center justify-center">
            <div className="max-w-md bg-white overflow-auto max-h-[calc(100vh-100px)]">
                <div className="bg-red-400 p-4 text-white flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Profile"
                            className="rounded-full border-2 border-gray-300 mr-2 shadow-sm w-[80px] h-[80px]"
                        />
                        <div>
                            <p className="text-sm">Siswa SMKN</p>
                            <p className="font-bold">MUHAMMAD KASYAF ANUGRAH</p>
                        </div>
                    </div>
                    <button className="bg-red-500 p-2 rounded-full">
                        <i className="fas fa-power-off"></i>
                    </button>
                </div>
                <div className="p-4">
                    <div className="bg-red-100 text-red-500 text-center p-2 rounded mb-4">
                        <p>Absensi Terakhir :</p>
                    </div>
                    <div className="flex flex-col items-center justify-center mb-4">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Profile"
                            className="rounded-full border-2 border-gray-300 shadow-sm w-[80px] h-[80px]"
                        />
                        <p className="font-bold mt-2">Thursday, 29 Dec 2022</p>
                        <p className="text-gray-500">11:01:54 WITA</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center bg-green-100 p-4 rounded">
                            <i className="fas fa-sign-in-alt text-green-500 text-2xl mr-4"></i>
                            <div>
                                <p className="font-bold">Datang</p>
                                <p className="text-sm text-gray-500">Absensi wajib yang dipergunakan pada saat datang di hari kerja</p>
                            </div>
                            <i className="fas fa-chevron-right ml-auto text-gray-400"></i>
                        </div>
                        <div className="flex items-center bg-red-100 p-4 rounded">
                            <i className="fas fa-sign-out-alt text-red-500 text-2xl mr-4"></i>
                            <div>
                                <p className="font-bold">Pulang</p>
                                <p className="text-sm text-gray-500">Absensi wajib yang dipergunakan pada saat pulang di hari kerja</p>
                            </div>
                            <i className="fas fa-chevron-right ml-auto text-gray-400"></i>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="font-bold mb-4">Pengajuan</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center bg-white p-4 rounded shadow">
                                <i className="fas fa-edit text-green-500 text-2xl mr-4"></i>
                                <div>
                                    <p className="font-bold">Ubah Absen</p>
                                    <p className="text-sm text-gray-500">Ajukan perubahan absen karena alasan tertentu</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white p-4 rounded shadow">
                                <i className="fas fa-edit text-red-500 text-2xl mr-4"></i>
                                <div>
                                    <p className="font-bold">Izin / Cuti</p>
                                    <p className="text-sm text-gray-500">Ajukan izin tidak hadir karena alasan tertentu</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white p-4 rounded shadow col-span-2">
                                <i className="fas fa-calendar-alt text-black text-2xl mr-4"></i>
                                <div>
                                    <p className="font-bold">Jadwal Saya</p>
                                    <p className="text-sm text-gray-500">Lihat detail jadwal kehadiran rutin Anda disini</p>
                                </div>
                                <i className="fas fa-chevron-right ml-auto text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-400 p-3 fixed bottom-0 left-0 right-0 flex justify-around items-center text-white max-w-md mx-auto rounded-t-lg">
                    <div className="flex flex-col items-center text-center">
                        <Link href="../dashboard/home">
                            <div className="flex flex-col items-center">
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
                                <span className="mt-1">Home</span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Link href="../dashboard/absen">
                            <div className="flex flex-col items-center">
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
                                <span>Absensi</span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Link href="../profile">
                            <div className="flex flex-col items-center">
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
                                <span className="mt-1">Profil</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Absensi() {
    const [absensiData, setAbsensiData] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(''); // State for selected status
    const [isLoading, setIsLoading] = useState(true); // State untuk loading

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Makassar' });
    };

    const checkAndResetData = (today) => {
        if (currentDate && currentDate !== today) {
            setAbsensiData([]);
            setIsButtonDisabled(false);
            setSelectedStatus(''); // Reset selected status
        }
        setCurrentDate(today);
    };

    const handleClockInOut = () => {
        const today = new Date().toISOString().split('T')[0];
        const currentTime = getCurrentTime();

        checkAndResetData(today);

        const existingAbsensi = absensiData.filter(absen => absen.date === today);

        if (existingAbsensi.length > 0) {
            const clockInRecord = existingAbsensi.find(absen => absen.status === 'Datang');
            const clockOutRecord = existingAbsensi.find(absen => absen.status === 'Pulang');

            if (clockInRecord) {
                const clockOutLimit = new Date();
                clockOutLimit.setHours(17, 0, 0);

                if (new Date() < clockOutLimit) {
                    const reason = prompt("Anda ingin pulang lebih awal. Mohon berikan alasan:");
                    if (reason) {
                        setAbsensiData((prev) => [
                            ...prev,
                            { id: prev.length + 1, date: today, status: 'Pulang', time: currentTime, reason, photo, selectedStatus }
                        ]);
                        alert(`Anda telah clock out pada ${currentTime} dengan alasan: ${reason}`);
                        setIsButtonDisabled(true);
                    }
                } else {
                    setAbsensiData((prev) => [
                        ...prev,
                        { id: prev.length + 1, date: today, status: 'Pulang', time: currentTime, photo, selectedStatus }
                    ]);
                    alert(`Anda telah clock out pada ${currentTime}`);
                    setIsButtonDisabled(true);
                }
            }
        } else {
            const clockInLimit = new Date();
            clockInLimit.setHours(7, 0, 0);

            if (new Date() <= clockInLimit) {
                setAbsensiData((prev) => [
                    ...prev,
                    { id: prev.length + 1, date: today, status: 'Datang', time: currentTime, photo, selectedStatus }
                ]);
            } else {
                const reason = prompt("Anda terlambat clock in. Mohon berikan alasan:");
                if (reason) {
                    setAbsensiData((prev) => [
                        ...prev,
                        { id: prev.length + 1, date: today, status: 'Datang', time: currentTime, reason, photo, selectedStatus }
                    ]);
                }
            }
        }
        // Reset the photo and selected status after the action
        setPhoto(null);
        setSelectedStatus('');
    };

    const clockIn = absensiData.find(absen => absen.date === currentDate && absen.status === 'Datang');
    const clockOut = absensiData.find(absen => absen.date === currentDate && absen.status === 'Pulang');

    useEffect(() => {
        if (clockOut) {
            const clockOutTime = new Date(`${currentDate}T${clockOut.time}`);
            const now = new Date();
            const hoursSinceClockOut = (now - clockOutTime) / (1000 * 60 * 60);

            if (hoursSinceClockOut < 24) {
                setIsButtonDisabled(true);
            } else {
                setIsButtonDisabled(false);
            }
        }
    }, [clockOut, currentDate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Setelah selesai loading, ubah state
        }, 2000);
        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    };

    // Function to handle radio button change
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value); // Set the selected status
    };

    return (
        <div className="min-h-full flex flex-col items-center justify-center bg-white">
            <div className="w-full max-w-md overflow-auto bg-white p-6 text-center bg-gray-100 rounded-lg">
                <div className='bg-white shadow-lg p-5 mb-3 rounded-lg flex justify-between'>
                    <p className="text-xl font-semibold">{currentTime}</p>
                    <p className="text-md mb-4">
                        {new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Makassar', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <div className="flex justify-between space-x-5">
                    <div className="mb-4 bg-blue-100 p-4 w-full rounded-lg">
                        <p className="text-lg font-semibold">Check In</p>
                        <p className="font-bold text-md text-left">{clockIn ? `${clockIn.time}` : '-'}</p>
                    </div>
                    <div className='mb-4 bg-blue-100 p-4 w-full rounded-lg'>
                        <p className="text-lg font-semibold">Check Out</p>
                        <p className="font-bold text-md text-left">{clockOut ? `${clockOut.time}` : '-'}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-left font-semibold">{new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Makassar', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div className='bg-white border border-gray-200 p-4 mt-2'>
                        <p className="text-md">Reguler</p>
                    </div>
                    <div className='bg-white rounded-b border border-gray-200 p-4'>
                        <p className="text-md">08:00 - 17:00</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className='bg-white p-4 border border-gray-200 space-x-2'>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="items-center"
                        />
                    </div>
                    {photo && <img src={photo} alt="Uploaded Photo" className="mt-2 w-24 h-24 object-cover rounded" />}
                </div>
                <div className="mt-4 text-left rounded-lg justify-center bg-white mb-3 shadow-lg p-4">
                    <div className='flex bg-white relative justify-between'>
                        <label className="block">
                            <input
                                type="radio"
                                name="status"
                                value="izin"
                                className='mr-2'
                                checked={selectedStatus === 'izin'}
                                onChange={handleStatusChange}
                            />
                            Izin
                        </label>
                        <div className='bg-white relative'>
                            <label className="block">
                                <input
                                    type="radio"
                                    name="status"
                                    className='mr-2'
                                    value="hadir"
                                    checked={selectedStatus === 'hadir'}
                                    onChange={handleStatusChange}
                                />
                                Hadir
                            </label>
                        </div>
                    </div>
                    <div className='flex bg-white relative justify-between'>
                        <label className="block">
                            <input
                                type="radio"
                                name="status"
                                className='mr-2'
                                value="sakit"
                                checked={selectedStatus === 'sakit'}
                                onChange={handleStatusChange}
                            />
                            Sakit
                        </label>
                        <div className='bg-white relative'>
                            <label className="block mr-2">
                                <input
                                    type="radio"
                                    name="status"
                                    className='mr-2'
                                    value="alpa"
                                    checked={selectedStatus === 'alpa'}
                                    onChange={handleStatusChange}
                                />
                                Alpa
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleClockInOut}
                    className={`w-full py-2 mt-2 rounded transition duration-300 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    disabled={isButtonDisabled}
                >
                    {clockIn ? 'Clock Out' : 'Clock In'}
                </button>
            </div>
            <div className="bg-blue-400 p-3 fixed bottom-0 left-0 right-0 flex justify-around items-center text-white max-w-md mx-auto rounded-t-lg">
                <div className="flex flex-col items-center text-center">
                    <Link href="./dashboard/home">
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
                    <Link href="./dashboard/absen">
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
                    <Link href="./profile">
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
    );
}

'use client';

import { getMe, logout } from "@/lib/api-login";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function UserMenu(){
    const [user, setUser] = useState<{name: string } | null>(null);
    const [open, setOpen] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const dummyNotifications = [
        "Proyek A telah diperbarui",
        "Invoice baru masuk",
        "Deadline proyek B mendekat",
        "User baru telah ditambahkan",
        "Sesi anda akan berakhir"
    ];


    useEffect(()=>{
        async function fetchUser(){
            try{
                const data = await getMe();
                setUser(data);
            } catch (err) {
                console.error('Gagal mengambil data',err);
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    useEffect(()=>{
        const handleClickOutSide = (event: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)){
                setOpen(false);
                setShowNotif(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide)
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('login');
            router.refresh();
        } catch (err){
            console.error('Gagal Logout', err)
        }
    };

    if (!user) return null;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => {
                    setShowNotif(prev => !prev);
                    setOpen(false); // pastikan user menu tertutup
                }}
                className="relative focus:outline-none hover:text-gray-300 mr-4"
            >
                <FontAwesomeIcon icon={faBell} size="lg" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">5</span>
            </button>

            {showNotif && (
                <div className="absolute right-12 top-10 w-64 bg-white text-black shadow rounded z-10">
                    <div className="p-2 border-b font-semibold text-sm text-gray-700">
                        <span className="font-semibold">Notifikasi Terbaru</span>
                    </div>
                    <ul className="max-h-60 overflow-auto text-sm">
                        {dummyNotifications.slice(0, 5).map((notif, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 border-b last:border-none"
                            >
                                {notif}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick= {() => setOpen((prev) => !prev)}      
                className="text-white text-sm px-3 py-2 bg-blue-700 rounded hover:bg-blue-800">
                    Hello, {user.name}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black shadow rounded z-10">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100">
                            Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100">
                            Logout
                    </button>
                </div>
            )}
        </div>
    )
}
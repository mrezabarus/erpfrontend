'use client';

import { logout } from "@/lib/api-login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TokenExpiredHandler(){
    const [showModal, setShowModal] = useState(false);
    const [hasHandled, setHasHandled] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        const handleTokenExpired = () => {

            if (hasHandled) return;

            setShowModal(true);
            setHasHandled(true);

            setTimeout(async () => {
                await logout();
                router.replace('/login');
            },2000)
        };

        window.addEventListener("token-expired", handleTokenExpired);
        return () => window.removeEventListener("token-expired", handleTokenExpired);
    },[hasHandled, router]);

    // const handleLogout = async () => {
    //     await logout();
    //     router.push('/login');
    //     router.refresh();
    // };

    if (!showModal) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                <div className="bg-white p-6 rounded shadow text-center">
                    <h2 className="text-lg font-semibold mb-4">Sesi anda telah habis</h2>
                    <p className="text-sm text-gray-600 mb-4">Silajkan login kembali untuk melanjutkan</p>
                    <div className="text-blue-600 font-bold animate-pulse">Logging out...</div>
                    {/* <button
                        onClick={handleLogout}
                        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
                    >Ok</button> */}
                </div>
            </div>
        </>
    )
}
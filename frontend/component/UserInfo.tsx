'use client';

import { getMe } from "@/lib/api-login";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function UserInfo(){
    const [user, setUser] = useState<{name: string} | null>(null);

    useEffect(() => {
        async function fetchUser(){
            try {
                const data = await getMe();
                setUser(data);
            }catch(err) {
                console.error('Gagal mengambil user', err);
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    return (
        <>
        {/* Kanan: User menu */}
        

        <div className="text-sm text-white">
            {user ? ` Hello, ${user.name} ` : 'Belum login'}
        </div>
        </>
        
    )
}
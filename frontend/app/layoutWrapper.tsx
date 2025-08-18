'use client';

import Navbar from "@/component/Navbar";
import Sidebar from "@/component/SideBar";
import TokenExpiredHandler from "@/component/TokenExpiredHandler";
import { usePathname } from "next/navigation";


export default function LayoutWrapper({ children }: {children: React.ReactNode}){
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith('/login');

    if (isAuthPage) return <>{children}</>;

    return (
        <>
            <Sidebar/>
            <div className="ml-58 min-h-screen flex flex-col">
                <Navbar/>
                <TokenExpiredHandler/>
                <main className="flex-grow p-6 bg-blue-50">
                    {children}
                </main>
            </div>
        </>
    )
}
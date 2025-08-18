'use client';

import Link from 'next/link';
import UserMenu from './UserMenu';
console.log('Navbar rendered');

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white px-5 py-3 shadow sticky top-0 z-50 border-b border-black-100">
      <div className="flex justify-between items-center">
        {/* Kiri: Judul + Menu */}
        <div className="flex items-center gap-6">
          {/* <div className="text-lg font-bold">ERP System</div>
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/project" className="hover:underline">Projects</Link> */}
        </div>

        
        <UserMenu />
      </div>
      
    </nav>
    
  );
}

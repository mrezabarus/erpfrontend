import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFolder, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const [openProjectSubMenu, setOpenProjectSubMenu] = useState(false);

  return (
    <aside className="fixed top-0 left-0 w-58 h-screen bg-blue-500 text-white border-r">
      
      {/* ERP System Branding */}
      <div className="h-15 flex items-center justify-center bg-neutral-600 text-xl font-bold border-b border-blue-500">
        ERP System
      </div>

      {/* Menu */}
      <nav className="flex flex-col space-y-2 p-4 text-sm font-medium">
        {/* Home */}
        <div className="border-b border-blue-300 pb-2">
          <Link href="/" className="flex items-center gap-3 hover:bg-blue-500 px-3 py-2 rounded">
            <FontAwesomeIcon icon={faHouse} className="w-4 h-4" />
            Home
          </Link>
        </div>

        {/* Projects + Dropdown */}
        <div className="border-b border-blue-300 pb-2">
          <button
            onClick={() => setOpenProjectSubMenu(!openProjectSubMenu)}
            className="flex items-center justify-between w-full hover:bg-blue-500 px-3 py-2 rounded"
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faFolder} className="w-4 h-4" />
              Projects
            </div>
            <FontAwesomeIcon icon={openProjectSubMenu ? faAngleUp : faAngleDown} className="w-4 h-4" />
          </button>

          {/* Submenu */}
          {openProjectSubMenu && (
            <div className="ml-6 mt-2 space-y-2 text-sm border-t border-blue-500 pt-2">
              <Link href="/project" className="block hover:underline py-1 border-b border-blue-400">
                Daftar Project
              </Link>
              <Link href="/project/new" className="block hover:underline py-1">
                Buat Project
              </Link>
            </div>
          )}
        </div>

        {/* Tambahkan menu lainnya jika diperlukan */}
      </nav>
    </aside>
  );
}

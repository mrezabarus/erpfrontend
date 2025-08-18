import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFolder, faHome, faUser, faCog, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const [menus, setMenus] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<{ [key:number]: boolean }>({});
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() =>{
    fetch(`${API_URL}/users/me/menus`,{
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
      const menuArray = Array.isArray(data) ? data : data?.menus || data?.data || [];
      setMenus(menuArray);
    })
    .catch((err) => console.error(err));
  },[]);

  const parents = menus.filter((m) => m.parent_id === null);
  const children = (parentId: number) => 
    menus.filter((m) => m.parent_id === parentId);

  const toggleSubMenu = (id: number) => {
    setOpenMenu((prev) => ({ ...prev, [id]: !prev[id]}));
  };

  const iconMap: Record<string, any> = {
    faUser: faUser,
    faFolder: faFolder,
    faHome: faHome,
    faCog: faCog,
  };

  return (
    <aside className="fixed top-0 left-0 w-58 h-screen bg-blue-500 text-white border-r">
      
      {/* ERP System Branding */}
      <div className="h-15 flex items-center justify-center bg-neutral-600 text-xl font-bold border-b border-blue-500">
        ERP System
      </div>

      {/* Menu */}
      <nav className="flex flex-col space-y-2 p-4 text-sm font-medium">
        {parents.length === 0 && (
          <div className="text-gray-300 text-sm">Tidak ada menu</div>
        )}
        
        {parents.map((parent) => {
          const childMenus = children(parent.id);
          const hasChildren = childMenus.length > 0;
          const IconComponent = iconMap[parent.icon] || faFolder; // fallback kalau null
          return (
            <div key={parent.id} className='border-b border-blue-300 pb-2'>
              {hasChildren ? (
                <>
                  <button
                    onClick={()=> toggleSubMenu(parent.id)}
                    className='flex items-center justify-between w-full hover:bg-blue-500 px-3 py-2 rounded'
                  >
                    
                    <div className='flex items-center gap-3'>
                      <FontAwesomeIcon icon={IconComponent} className='w-4 h-4'/>
                      {parent.name}
                    </div>
                    <FontAwesomeIcon
                      icon={openMenu[parent.id] ? faAngleUp : faAngleDown}
                      className='w-4 h-4'
                    />
                  </button>

                  {/* Submenu */}
                  {openMenu[parent.id] && (
                    <div className="ml-6 mt-2 space-y-2 text-sm border-t border-blue-500 pt-2">
                      {childMenus.map((child) => (
                        <Link
                          key={child.id}
                          href={child.path}
                          className="block hover:underline py-1 border-b border-blue-400"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={parent.path || '#'}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-blue-500"
                >
                  <FontAwesomeIcon icon={faHouse} className='w-4 h-4'/>
                  {parent.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

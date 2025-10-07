import React from "react";
import { NavLink } from "react-router-dom";
import Icons from "../../components/icon";

interface MainSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: "/", label: "Trang chủ", key: "home", icon: Icons.Dashboard },
    { path: "/snaper", label: "Snaper", key: "snaper", icon: Icons.Camera },
    { path: "/blog", label: "Blog", key: "blog", icon: Icons.FormIcon },
    { path: "/about", label: "Giới thiệu", key: "about", icon: Icons.Building },
    { path: "/contact", label: "Liên hệ", key: "contact", icon: Icons.Mail },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#D9D9D9] via-gray-200 to-[#D9D9D9] transform transition-all duration-300 ease-out z-50 lg:hidden flex flex-col shadow-2xl shadow-black/20 border-r border-gray-300/30 ${isOpen ? "translate-x-0 scale-100" : "-translate-x-full scale-95"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300/50 bg-gradient-to-r from-gray-200 to-gray-300">
          <h2 className="font-sf-pro font-extrabold text-2xl drop-shadow-sm bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            SNAPDI
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-300/60 hover:shadow-md transition-all duration-200 active:scale-90 group"
          >
            {/* Simple X icon */}
            <div className="w-6 h-6 flex items-center justify-center text-black group-hover:text-red-500 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="py-4 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={onClose} // Close sidebar when item is clicked
                className={({ isActive }) =>
                  `group flex items-center w-full px-6 py-4 font-sf-pro font-bold gap-4 transition-all duration-300 transform hover:translate-x-1 ${isActive
                    ? "bg-gradient-to-r from-[#34D399] to-[#10B981] text-white border-r-4 border-white shadow-xl shadow-emerald-500/25"
                    : "text-black hover:bg-gray-300/60 hover:text-black active:scale-95"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <IconComponent className={`w-6 h-6 transition-colors duration-200 ${isActive ? 'text-white drop-shadow-sm' : 'text-black group-hover:text-emerald-600'
                      }`} />
                    <span className={`text-lg transition-all duration-200 ${isActive ? 'text-white drop-shadow-sm font-extrabold' : 'group-hover:text-emerald-600'
                      }`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-300/50 space-y-3 bg-gradient-to-t from-gray-200/50 to-transparent">
          <button className="w-full bg-gradient-to-r from-[#34D399] to-[#10B981] text-white py-3 rounded-2xl font-sf-pro font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none">
            Tải xuống ngay
          </button>
        </div>
      </div>
    </>
  );
};

export default MainSidebar;
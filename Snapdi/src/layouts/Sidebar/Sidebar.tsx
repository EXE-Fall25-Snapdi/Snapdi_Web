import React, { useState, type JSX } from "react";
// import { useUserStore } from "../../config/zustand";
import Images from "../../components/images";
import Icons from "../../components/icon";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../utils/userUtils";

const Sidebar: React.FC = () => {
  // const userData = useUserStore((state) => state.user);
  // let user = userData || '{}';
  // let parseUser = typeof user === "string" ? JSON.parse(user) : user;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(false);
    setTimeout(() => {
      toast.success("Logout successfully!");
    }, 1000);
    logout();
  };

  const menuItems: Record<
    string,
    { path: string; icon: JSX.Element; label: string }[]
  > = {
    A001: [
      {
        path: "admin-dashboard",
        icon: <Icons.Dashboard className="w-8 h-8" />,
        label: "Dashboard",
      },
      {
        path: "user-management",
        icon: <Icons.User className="w-8 h-8" />,
        label: "User Management",
      },
      {
        path: "blogs-management",
        icon: <Icons.FolderDot className="w-8 h-8" />,
        label: "Blogs Management",
      },
      {
        path: "transaction-history",
        icon: <Icons.History className="w-8 h-8" />,
        label: "Transaction History",
      },
      {
        path: "photographer-applications",
        icon: <Icons.Camera className="w-8 h-8" />,
        label: "Photographer Applications",
      },
    ],
  };

  return (
    <>
      <div
        className="fixed lg:relative top-0 left-0 h-full z-50 bg-black
  translate-x-0 w-72"
      >
        <div className="flex flex-col gap-4 mt-4 pl-4">
          <div className="flex items-center justify-center pr-4">
            <img
              src={Images.logoWhite}
              alt="logo"
              className="lg:max-w-12 lg:h-12 max-w-16 transition-all duration-300"
            />
            <span className="text-white text-3xl ml-4">Snapdi</span>
          </div>
          {/* {parseUser.role_code && menuItems[parseUser.role_code] && ( */}
          {/* {parseUser.role_code && menuItems[parseUser.role_code] && ( */}
          {/* check role_code */}
          <div className="border-t border-gray-400 my-2 mr-4">
          </div>
          <>
            {menuItems["A001"].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 px-3 py-2 rounded-l-2xl transition-all duration-300
                ${isActive
                    ? "text-blue-700!"
                    : "text-white! hover:text-gray-800"
                  }
                ${hoveredIndex !== null && hoveredIndex !== index
                    ? "opacity-50 scale-100"
                    : "opacity-100 scale-105"
                  }`
                }
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="flex-shrink-0 text-sm">{item.icon}</span>
                <span className="truncate text-sm">{item.label}</span>
              </NavLink>
            ))}
          </>
          {/* )} check role_code */}
          <div className="border-t border-gray-400 my-2 mr-4"></div>
          <NavLink
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setShowConfirm(true);
            }}
            className="flex items-center gap-4 px-2 text-red-600! hover:text-white! hover:scale-105"
          >
            <Icons.LogOut className="w-6 h-6" />
            <span className="text-sm">Log out</span>
          </NavLink>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-brand-orange-light backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 hover:scale-120 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-brand-gradient text-white bg-red-600! hover:scale-120 transition cursor-pointer"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

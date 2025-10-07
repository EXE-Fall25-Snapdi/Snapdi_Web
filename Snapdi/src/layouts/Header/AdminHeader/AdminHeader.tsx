import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// import { useUser } from "../../../contexts/UserContext";
import Icons from "../../../components/icon";
import { useUserStore } from "../../../config/zustand";
import { toast } from "react-toastify";
import { logout } from "../../../utils/userUtils";
import { APP_CONSTANTS } from "../../../constants/appConstants";

const AdminHeader: React.FC = () => {
  // const { user } = useUser();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userData = useUserStore((state) => state.user);
  const userRole =
    APP_CONSTANTS.roleNames[
    userData?.role_code as keyof typeof APP_CONSTANTS.roleNames
    ] || "Guest";
  const currentTitle =
    APP_CONSTANTS.pageTitles[
    location.pathname as keyof typeof APP_CONSTANTS.pageTitles
    ] || "Admin Panel";

  const handleLogout = () => {
    setShowConfirm(false);
    setTimeout(() => {
      toast.success("Logout successfully!");
    }, 1000);
    logout();
  };

  // 🟢 Xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full py-4 px-6">
        <div className="flex items-center gap-4">
          <p className="text-black text-3xl font-bold">{currentTitle}</p>
        </div>


        {/* User Dropdown */}
        <div className="flex items-center bg-white rounded-full">

          <div className="relative" ref={dropdownRef}>
            {userData?.avatarUrl ? (
              <button
                className="bg-gray-200! p-2 hover:bg-brand-gradient rounded-full overflow-hidden group"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={userData?.avatarUrl || "https://randomuser.me/api/portraits/men/1.jpg"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
            ) : (
              <button
                className="bg-gray-200! hover:bg-brand-gradient rounded-full group"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full overflow-hidden">
                  <Icons.User className="text-black group-hover:text-white w-7 h-7 rounded-full!" />
                </div>
              </button>
            )}
            <div
              className={`absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg overflow-hidden z-50 border border-gray-200 transition-all duration-200 ease-in-out transform ${dropdownOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
              {/* User Info */}
              <div className="flex items-center gap-3 px-5 py-4 border-b bg-gray-50">
                <img
                  src={userData?.avatarUrl || "https://randomuser.me/api/portraits/men/1.jpg"}
                  alt="User Avatar"
                  className="w-10 h-10 flex-shrink-0 bg-gray-300 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {userData?.username || "Guest"}
                  </p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                  <p className="text-sm text-gray-600">
                    {userData?.email || "NaN"}
                  </p>
                </div>
              </div>

              {/* Dropdown Actions */}
              <div className="py-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirm(true);
                  }}
                  className="w-full flex items-center bg-gray-100! gap-3 text-left px-5 py-3 text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <Icons.LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >

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
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:scale-120 transition cursor-pointer"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )
      }
      <div className="border-b border-gray-700 ml-4 mr-4"></div>
    </>
  );
};

export default AdminHeader;

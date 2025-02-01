import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBlog,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartBar,
  FaEnvelope,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

import Logo from "../../assets/Images/Logo.png";
import { useAuthContext } from "../../context/AuthContext";

function DashboardLayout({ children }) {
  const { logout, user } = useAuthContext();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setRole(user.role); 
    }
  }, [user]);


  const menuItems = [
    { 
      path: "/dashboard", 
      icon: FaHome, 
      label: "Dashboard", 
      roles: ["admin", "normal_user", "superadmin"],
      bgColor: "from-blue-400 to-blue-600"
    },
    { 
      path: "/application", 
      icon: FaHome, 
      label: "Application", 
      roles: ["normal_user"],
      bgColor: "from-purple-400 to-purple-600"
    },
    { 
      path: "/idcard", 
      icon: FaHome, 
      label: "ID Card", 
      roles: ["normal_user"],
      bgColor: "from-pink-400 to-pink-600"
    },
    { 
      path: "/dashboard/users", 
      icon: FaUsers, 
      label: "User Management", 
      roles: ["admin"],
      bgColor: "from-green-400 to-green-600"
    },
    { path: "/dashboard/blog", icon: FaBlog, label: "Blog Management", roles: ["admin"] , bgColor: "from-green-400 to-green-600"},
    { path: "/dashboard/events", icon: FaCalendarAlt, label: "Events", roles: ["admin",, "institution"] , bgColor: "from-green-400 to-green-600"},
    { path: "/dashboard/finance", icon: FaMoneyBillWave, label: "Financials", roles: ["admin", "superadmin"] , bgColor: "from-green-400 to-green-600"},
    { path: "/dashboard/analytics", icon: FaChartBar, label: "Analytics", roles: ["admin", "normal_user"] },
    { path: "/dashboard/messages", icon: FaEnvelope, label: "Communication", roles: ["admin"] , bgColor: "from-green-400 to-green-600"},
    { path: "/dashboard/settings", icon: FaCog, label: "Settings", roles: ["admin"] , bgColor: "from-green-400 to-green-600"},
    { path: "/profile", icon: FaUserCircle, label: "Profile", roles: ["admin", "normal_user", "institution", "superadmin"] , bgColor: "from-green-400 to-green-600"},
    // { path: "/dashboard/events", icon: FaCalendarAlt, label: "Events", roles: ["admin", "normal_user", "institution"] },
  ];


  return (
    <div className="min-h-screen bg-gray-100 ">
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white shadow-xl w-72`}
      >
    
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-3">
            <img src={Logo} alt="NULASS Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              NULASS
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <FaCog className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <FaUserCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">{userName}</h3>
              <p className="text-xs text-gray-500">{role?.replace('_', ' ').toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems
            .filter((item) => item.roles.includes(role))
            .map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive 
                      ? `bg-gradient-to-r ${item.bgColor} text-white shadow-lg` 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Background Animation */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'text-white' 
                      : `text-gray-600 group-hover:text-gray-900`
                  }`}>
                    <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? 'rotate-6' : ''
                    }`} />
                  </div>
                  
                  {/* Label */}
                  <span className={`font-medium ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute right-4 w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  )}
                </Link>
              );
            })}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center space-x-3 p-3 w-full text-left rounded-xl transition-all duration-300 group relative overflow-hidden hover:bg-red-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="p-2 rounded-lg text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-14v1"
                />
              </svg>
            </div>
            <span className="font-medium text-red-600">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? "lg:ml-72" : ""}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <FaCog className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="w-8 h-8" />
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold">{userName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;

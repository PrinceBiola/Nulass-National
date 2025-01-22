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
    { path: "/dashboard", icon: FaHome, label: "Dashboard", roles: ["admin", "normal_user"] },
    { path: "/dashboard/users", icon: FaUsers, label: "User Management", roles: ["admin"] },
    { path: "/dashboard/blog", icon: FaBlog, label: "Blog Management", roles: ["admin"] },
    { path: "/dashboard/events", icon: FaCalendarAlt, label: "Events", roles: ["admin", "normal_user", "institution"] },
    { path: "/dashboard/finance", icon: FaMoneyBillWave, label: "Financials", roles: ["admin"] },
    { path: "/dashboard/analytics", icon: FaChartBar, label: "Analytics", roles: ["admin", "normal_user"] },
    { path: "/dashboard/messages", icon: FaEnvelope, label: "Communication", roles: ["admin"] },
    { path: "/dashboard/settings", icon: FaCog, label: "Settings", roles: ["admin"] },
    { path: "/profile", icon: FaUserCircle, label: "Profile", roles: ["admin", "normal_user", "institution"] },
  ];


  return (
    <div className="min-h-screen bg-gray-100">
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 w-64`}
      >
    
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="flex items-center space-x-3">
            <img src={Logo} alt="NULASS Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold">NULASS Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <FaCog className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems
            .filter((item) => item.roles.includes(role))
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-customGreen text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          <button
            onClick={logout}
            className="flex items-center space-x-3 p-3 w-full text-left rounded-lg transition-colors bg-red-100 text-red-700 hover:bg-red-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? "lg:ml-64" : ""}`}>
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

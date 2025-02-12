import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaUsers, FaBlog, FaCalendarAlt, FaMoneyBillWave,
  FaChartBar, FaEnvelope, FaCog, FaUserCircle, FaIdCard,
  FaUserAlt, FaBars, FaSearch, FaBell
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
      roles: ["admin", "member", "superadmin", "intitution"],
      bgColor: "from-blue-400 to-blue-600"
    },
    {
      path: "/application",
      icon: FaUserAlt,
      label: "Application",
      roles: ["member"],
      bgColor: "from-purple-400 to-purple-600"
    },
    
    // {
    //   path: "/application",
    //   icon: FaUserAlt,
    //   label: "Application",
    //   roles: ["member"],
    //   bgColor: "from-purple-400 to-purple-600"
    // },
    {
      path: "/admin-application",
      icon: FaUsers,
      label: "Application Management",
      roles: [ "admin"],
      bgColor: "from-purple-400 to-purple-600"
    },
    {
      path: "/payments",
      icon: FaMoneyBillWave,
      label: "Payments",
      roles: ["admin"],
      bgColor: "from-purple-400 to-purple-600"
    },
    {
      path: "/idcard",
      icon: FaIdCard,
      label: "ID Card",
      roles: ["member"],
      bgColor: "from-pink-400 to-pink-600"
    },
    {
      path: "/dashboard/users",
      icon: FaUsers,
      label: "Member Management",
      roles: ["admin"],
      bgColor: "from-green-400 to-green-600"
    },
    { path: "/dashboard/blog", icon: FaBlog, label: "Blog Management", roles: ["admin"], bgColor: "from-green-400 to-green-600" },
    { path: "/dashboard/events", icon: FaCalendarAlt, label: "Events", roles: ["admin", , "institution"], bgColor: "from-green-400 to-green-600" },
    { path: "/dashboard/finance", icon: FaMoneyBillWave, label: "Financials", roles: ["admin", "superadmin"], bgColor: "from-green-400 to-green-600" },
    { path: "/dashboard/analytics", icon: FaChartBar, label: "Analytics", roles: ["admin", "member"] },
    // { path: "/dashboard/messages", icon: FaEnvelope, label: "Communication", roles: ["admin"], bgColor: "from-green-400 to-green-600" },
    // { path: "/dashboard/settings", icon: FaCog, label: "Settings", roles: ["admin"], bgColor: "from-green-400 to-green-600" },
    { path: "/profile", icon: FaUserCircle, label: "Profile", roles: ["admin", "member", "institution", "superadmin"], bgColor: "from-green-400 to-green-600" },
    // { path: "/dashboard/events", icon: FaCalendarAlt, label: "Events", roles: ["admin", "member", "institution"] },
  ];


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static lg:translate-x-0 z-50 h-full transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        w-72 bg-white border-r border-gray-200 shadow-sm`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <Link to="/" className="flex items-center space-x-3">
            <img src={Logo} alt="NULASS" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              NULASS
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <FaBars className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="p-4 border-b">
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {userName?.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{userName}</h3>
                <p className="text-xs text-gray-500">{role?.replace('_', ' ').toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          {menuItems
            .filter((item) => item.roles.includes(role))
            .map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-green-600 to-green-600 text-white shadow-md'
                      : 'hover:bg-gray-50 text-gray-700'
                    }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="ml-3 font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
                  )}
                </Link>
              );
            })}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-14v1" />
            </svg>
            <span className="ml-3 font-medium text-sm">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FaBars className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg">
              <FaBell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="hidden md:flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {userName?.charAt(0)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{userName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

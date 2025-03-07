import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  FaHome, FaUsers, FaBlog, FaCalendarAlt, FaMoneyBillWave,
  FaChartBar, FaEnvelope, FaCog, FaUserCircle, FaIdCard,
  FaUserAlt, FaBars, FaSearch, FaBell, FaFileAlt, FaTimes, FaSignOutAlt, FaList
} from "react-icons/fa";
import Logo from "../../assets/Images/Logo.png";
import { useAuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const userNavItems = [
  {
    icon: <FaHome className="w-5 h-5" />,
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <FaUserAlt className="w-5 h-5" />,
    label: 'Profile',
    path: '/dashboard/profile'
  },
  {
    icon: <FaFileAlt className="w-5 h-5" />,
    label: 'Application',
    path: '/dashboard/application'
  },
  {
    icon: <FaIdCard className="w-5 h-5" />,
    label: 'ID Card',
    path: '/dashboard/id-card'
  },
  {
    icon: <FaList className="w-5 h-5" />,
    label: 'My Applications',
    path: '/dashboard/user-order'
  }
];

const adminNavItems = [
  {
    path: "/admin/applications",
    icon: <FaUsers className="w-5 h-5" />,
    label: "Application Management",
  },
  {
    path: "/admin/users",
    icon: <FaUserAlt className="w-5 h-5" />,
    label: "User Management",
  },
  {
    path: "/admin/blog",
    icon: <FaBlog className="w-5 h-5" />,
    label: "Blog Management",
  },
  {
    path: "/admin/events",
    icon: <FaCalendarAlt className="w-5 h-5" />,
    label: "Events",
  },
  {
    path: "/admin/financials",
    icon: <FaMoneyBillWave className="w-5 h-5" />,
    label: "Financials",
  },
  {
    path: "/admin/analytics",
    icon: <FaChartBar className="w-5 h-5" />,
    label: "Analytics",
  },
  {
    path: "/admin/communication",
    icon: <FaEnvelope className="w-5 h-5" />,
    label: "Communication",
  },
  {
    path: "/admin/settings",
    icon: <FaCog className="w-5 h-5" />,
    label: "Settings",
  }
];

const DashboardLayout = () => {
  const { logout, user } = useAuthContext();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const location = useLocation();
  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setRole(user.role);
    }
  }, [user]);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    // The user will be automatically redirected to login 
    // because of the PrivateRoutes component
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src={Logo} alt="Logo" className="h-8" />
            <span className="text-xl font-semibold text-customGreen">Nulass</span>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <nav className="mt-4 px-2 flex-1">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-4 py-3 my-1 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-customGreen bg-opacity-10 text-customGreen' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {item.icon}
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <FaBars className="w-5 h-5 text-gray-500" />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full hidden sm:block">
                <FaBell className="w-5 h-5 text-gray-500" />
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  <FaUserCircle className="w-8 h-8 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {userName}
                  </span>
                </button>
                {/* Dropdown menu could go here */}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaBlog, FaCalendarAlt, 
  FaMoneyBillWave, FaChartBar, FaEnvelope, 
  FaCog, FaDatabase, FaBell, FaSearch, FaUserCircle 
} from 'react-icons/fa';

import Logo from '../../assets/Images/Logo.png'

function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/institution-dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/institution-dashboard/members', icon: FaUsers, label: 'Membership Management' },
    // { path: '/institution-dashboard/events', icon: FaBlog, label: 'Events' },
    { path: '/institution-dashboard/communication', icon: FaCalendarAlt, label: 'Communication Hub' },
    { path: '/institution-dashboard/finance', icon: FaMoneyBillWave, label: 'Financial Management' },
    { path: '/institution-dashboard/analytics', icon: FaChartBar, label: 'Analytics and Reports' },
    // { path: '/institution-dashboard/academics', icon: FaEnvelope, label: 'Academic and Development Resources' },
    // { path: '/institution-dashboard/profile', icon: FaCog, label: 'Institution Profile Management' },
    // { path: '/institution-dashboard/feedback', icon: FaCog, label: 'Feedback and Suggestions' },

  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r border-gray-200 w-64`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b ">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <img src={Logo} alt="NULASS Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold">NULASS Tasued</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <FaCog className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-3 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-customGreen text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className='text-lg'>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''}`}>
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
              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-customGreen"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Notifications and Profile */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <FaBell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Profile */}
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="w-8 h-8" />
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold">Admin User</p>
                    <p className="text-xs text-gray-500">admin@nulass.org</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout; 
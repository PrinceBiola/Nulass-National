import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: HomeIcon,
    color: 'from-blue-500 to-blue-600'
  },
  { 
    name: 'Employees', 
    href: '/employees', 
    icon: UsersIcon,
    color: 'from-purple-500 to-purple-600'
  },
  { 
    name: 'Payroll', 
    href: '/payroll', 
    icon: CurrencyDollarIcon,
    color: 'from-green-500 to-green-600'
  },
  { 
    name: 'Reports', 
    href: '/reports', 
    icon: DocumentChartBarIcon,
    color: 'from-yellow-500 to-yellow-600'
  },
  { 
    name: 'Compliance', 
    href: '/compliance', 
    icon: ClipboardDocumentCheckIcon,
    color: 'from-red-500 to-red-600'
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Cog6ToothIcon,
    color: 'from-gray-500 to-gray-600'
  },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`relative flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-lg 
                ${collapsed ? 'bg-gradient-to-br ' + item.color : ''}
              `}>
                <item.icon className={`w-6 h-6 ${collapsed ? 'text-white' : ''}`} />
              </div>
              {!collapsed && (
                <span className="ml-3 text-sm font-medium">{item.name}</span>
              )}
              {collapsed && (
                <div className="absolute left-20 hidden group-hover:block">
                  <div className="bg-gray-900 text-white text-sm py-1 px-3 rounded-md">
                    {item.name}
                  </div>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50"
      >
        {collapsed ? (
          <ChevronDoubleRightIcon className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDoubleLeftIcon className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  );
}

export default Sidebar; 
import React from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <div className="flex items-center flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
                <span className="text-xl font-bold text-white">P</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">PayrollNG</span>
            </div>
            <div className="hidden md:block ml-10 flex-1">
              <div className="relative max-w-xs">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-gray-500 hover:text-gray-600">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">John Doe</span>
                <span className="text-xs text-gray-500">Admin</span>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 
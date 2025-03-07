import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  AdjustmentsHorizontalIcon,
  EnvelopeIcon,
  PhoneIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

function EmployeeManagement() {
  const [view, setView] = useState('grid');
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your workforce efficiently</p>
        </div>
        <button className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Employee
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
              Filters
            </button>
            <div className="flex rounded-lg border border-gray-200">
              <button 
                onClick={() => setView('grid')}
                className={`px-4 py-2 ${view === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'}`}
              >
                Grid
              </button>
              <button 
                onClick={() => setView('list')}
                className={`px-4 py-2 ${view === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Employee Card */}
        {[1, 2, 3, 4, 5, 6].map((employee) => (
          <div key={employee} className="group overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=John+Doe&background=random`}
                  alt="Employee"
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-gray-600">
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  <span className="text-sm">john.doe@company.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  <span className="text-sm">+234 801 234 5678</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BanknotesIcon className="w-5 h-5 mr-2" />
                  <span className="text-sm">₦450,000/month</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Active
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">50</span> employees
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement; 
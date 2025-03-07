import React, { useState } from 'react';
import { 
  ClipboardDocumentCheckIcon, 
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';

function Compliance() {
  const [selectedMonth, setSelectedMonth] = useState('May 2024');

  const complianceStatus = {
    tax: { status: 'completed', dueDate: 'May 30, 2024', lastUpdated: '2 days ago' },
    pension: { status: 'pending', dueDate: 'May 25, 2024', lastUpdated: '5 days ago' },
    nhf: { status: 'completed', dueDate: 'May 20, 2024', lastUpdated: '1 week ago' },
    nsitf: { status: 'attention', dueDate: 'May 28, 2024', lastUpdated: '3 days ago' }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Management</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage regulatory compliance</p>
        </div>
        <div className="flex space-x-3">
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option>May 2024</option>
            <option>June 2024</option>
            <option>July 2024</option>
          </select>
        </div>
      </div>

      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Compliant Items</p>
              <p className="text-2xl font-semibold text-gray-900">12/15</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Items</p>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Attention Required</p>
              <p className="text-2xl font-semibold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full">
              <BellAlertIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Upcoming Deadlines</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Compliance Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Compliance Requirements */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Compliance Requirements</h2>
            <div className="mt-6 space-y-4">
              {Object.entries(complianceStatus).map(([key, value]) => (
                <div key={key} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {value.status === 'completed' && (
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      )}
                      {value.status === 'pending' && (
                        <ClockIcon className="w-5 h-5 text-yellow-500" />
                      )}
                      {value.status === 'attention' && (
                        <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                      )}
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {key.toUpperCase()} Compliance
                      </span>
                    </div>
                    <button className="px-3 py-1 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                      Update
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p className="text-sm font-medium text-gray-900">{value.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Updated</p>
                      <p className="text-sm font-medium text-gray-900">{value.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Document Management */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Document Management</h2>
            <div className="mt-6 space-y-4">
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-indigo-500">
                <div className="flex flex-col items-center justify-center">
                  <ArrowUpTrayIcon className="w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm font-medium text-gray-900">Upload Documents</p>
                  <p className="mt-1 text-xs text-gray-500">Drag and drop or click to upload</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">Tax_Compliance_May2024.pdf</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">Pension_Report_Q2.pdf</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <ClockIcon className="w-5 h-5 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Pension Remittance</p>
                  <p className="text-xs text-gray-500">Due in 3 days</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-red-50 rounded-lg">
                <ExclamationCircleIcon className="w-5 h-5 text-red-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">NSITF Payment</p>
                  <p className="text-xs text-gray-500">Due tomorrow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">Compliance Audit Log</h2>
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Tax Compliance Update</td>
                  <td className="px-6 py-4 text-sm text-gray-500">PAYE</td>
                  <td className="px-6 py-4 text-sm text-gray-500">May 15, 2024</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
                {/* Add more audit log entries */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compliance; 
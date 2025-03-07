import React, { useState } from 'react';
import { 
  BanknotesIcon, 
  ArrowTrendingUpIcon, 
  UserGroupIcon, 
  CalendarIcon,
  DocumentCheckIcon,
  ArrowPathIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PayrollWizard from '../components/PayrollWizard';

const payrollData = {
  totalPayroll: "₦15,750,000",
  totalEmployees: 250,
  averageSalary: "₦430,000",
  nextPayday: "May 25, 2024"
};

function PayrollProcessing() {
  const [selectedMonth, setSelectedMonth] = useState('May 2024');
  const [processing, setProcessing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Processing</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and process employee payments</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
            Download Report
          </button>
          <button 
            className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            onClick={() => setProcessing(true)}
          >
            {processing ? (
              <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <BanknotesIcon className="w-5 h-5 mr-2" />
            )}
            Process Payroll
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full">
              <BanknotesIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Payroll</p>
              <p className="text-2xl font-semibold text-gray-900">{payrollData.totalPayroll}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <UserGroupIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-semibold text-gray-900">{payrollData.totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <ArrowTrendingUpIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Salary</p>
              <p className="text-2xl font-semibold text-gray-900">{payrollData.averageSalary}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <CalendarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Next Payday</p>
              <p className="text-2xl font-semibold text-gray-900">{payrollData.nextPayday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add the PayrollWizard component */}
      <PayrollWizard />

      {/* Main Processing Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Payroll Details */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Payroll Details</h2>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <select 
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option>May 2024</option>
                <option>June 2024</option>
                <option>July 2024</option>
              </select>
              <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                <CloudArrowUpIcon className="w-5 h-5 mr-2" />
                Import Data
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Basic Salary</span>
                  <span className="text-sm font-semibold text-gray-900">₦12,500,000</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Allowances</span>
                  <span className="text-sm font-semibold text-gray-900">₦2,250,000</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Deductions</span>
                  <span className="text-sm font-semibold text-text-gray-900">-₦1,750,000</span>
                </div>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-600">Net Payroll</span>
                  <span className="text-sm font-semibold text-indigo-600">₦15,750,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deductions Breakdown */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Deductions Breakdown</h2>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Tax (PAYE)', value: 850000, fill: '#4F46E5' },
                    { name: 'Pension', value: 500000, fill: '#7C3AED' },
                    { name: 'NHF', value: 250000, fill: '#EC4899' },
                    { name: 'Others', value: 150000, fill: '#8B5CF6' },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bulk Payment Section */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">Bulk Payment Processing</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
            <DocumentCheckIcon className="w-6 h-6 text-yellow-600" />
            <span className="ml-3 text-sm text-yellow-700">
              Please review all payments before processing. This action cannot be undone.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600">Bank Transfer</h3>
              <p className="mt-2 text-2xl font-semibold text-gray-900">180</p>
              <p className="mt-1 text-sm text-gray-500">employees</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600">Mobile Money</h3>
              <p className="mt-2 text-2xl font-semibold text-gray-900">45</p>
              <p className="mt-1 text-sm text-gray-500">employees</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600">Digital Wallets</h3>
              <p className="mt-2 text-2xl font-semibold text-gray-900">25</p>
              <p className="mt-1 text-sm text-gray-500">employees</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <p className="mt-2 text-2xl font-semibold text-text-gray-900">0</p>
              <p className="mt-1 text-sm text-gray-500">employees</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
              Save Draft
            </button>
            <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Process All Payments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayrollProcessing; 
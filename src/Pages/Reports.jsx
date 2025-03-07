import React, { useState } from 'react';
import { 
  DocumentChartBarIcon, 
  ArrowDownTrayIcon,
  FunnelIcon,
  CalendarDaysIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', payroll: 14500000, employees: 240 },
  { month: 'Feb', payroll: 15000000, employees: 245 },
  { month: 'Mar', payroll: 15200000, employees: 248 },
  { month: 'Apr', payroll: 15500000, employees: 250 },
  { month: 'May', payroll: 15750000, employees: 250 },
];

function Reports() {
  const [reportType, setReportType] = useState('payroll');
  const [dateRange, setDateRange] = useState('monthly');

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Comprehensive payroll and employee reports</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <PrinterIcon className="w-5 h-5 mr-2" />
            Print
          </button>
          <button className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <select 
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="payroll">Payroll Summary</option>
              <option value="tax">Tax Report</option>
              <option value="deductions">Deductions Report</option>
              <option value="department">Department Analysis</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
            <select 
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Report Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Payroll Trend */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Payroll Trend</h2>
          <div className="h-80 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="payroll" stroke="#4F46E5" fill="#EEF2FF" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employee Count Trend */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Employee Count Trend</h2>
          <div className="h-80 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="employees" stroke="#7C3AED" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">Detailed Reports</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Payroll</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.month} 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦{(data.payroll).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.employees}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₦{Math.round(data.payroll / data.employees).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-sm">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm font-medium opacity-80">Total Tax Deductions</p>
              <p className="mt-1 text-2xl font-semibold">₦2,850,000</p>
            </div>
            <DocumentChartBarIcon className="w-8 h-8 opacity-80" />
          </div>
          <div className="mt-4">
            <button className="px-3 py-1 text-sm text-white bg-white/20 rounded-lg hover:bg-white/30">
              View Report
            </button>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-sm">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm font-medium opacity-80">Pension Contributions</p>
              <p className="mt-1 text-2xl font-semibold">₦1,575,000</p>
            </div>
            <DocumentChartBarIcon className="w-8 h-8 opacity-80" />
          </div>
          <div className="mt-4">
            <button className="px-3 py-1 text-sm text-white bg-white/20 rounded-lg hover:bg-white/30">
              View Report
            </button>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-sm">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm font-medium opacity-80">Other Deductions</p>
              <p className="mt-1 text-2xl font-semibold">₦787,500</p>
            </div>
            <DocumentChartBarIcon className="w-8 h-8 opacity-80" />
          </div>
          <div className="mt-4">
            <button className="px-3 py-1 text-sm text-white bg-white/20 rounded-lg hover:bg-white/30">
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports; 
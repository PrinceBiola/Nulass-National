import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CurrencyDollarIcon, UsersIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const data = [
  { month: 'Jan', amount: 4000 },
  { month: 'Feb', amount: 3000 },
  { month: 'Mar', amount: 5000 },
  { month: 'Apr', amount: 4500 },
  { month: 'May', amount: 6000 },
  { month: 'Jun', amount: 5500 },
];

const stats = [
  { name: 'Total Employees', value: '250', icon: UsersIcon, color: 'bg-blue-500' },
  { name: 'Monthly Payroll', value: '₦15.5M', icon: CurrencyDollarIcon, color: 'bg-green-500' },
  { name: 'Next Payday', value: '25th May', icon: ClockIcon, color: 'bg-purple-500' },
  { name: 'Tax Compliance', value: '98%', icon: ChartBarIcon, color: 'bg-yellow-500' },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-medium text-gray-900">Payroll Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#4F46E5" fill="#EEF2FF" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Recent Activities</h2>
          <div className="space-y-4">
            {/* Activity items */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <UsersIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">New employee onboarded</p>
                <p className="text-sm text-gray-500">John Doe - Software Engineer</p>
              </div>
              <div className="ml-auto">
                <span className="text-sm text-gray-500">2h ago</span>
              </div>
            </div>
            {/* Add more activity items */}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Upcoming Payments</h2>
          <div className="space-y-4">
            {/* Payment items */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Monthly Salary Payment</p>
                <p className="text-sm text-gray-500">Due on 25th May</p>
              </div>
              <div className="ml-auto">
                <span className="text-sm font-medium text-green-600">₦12.5M</span>
              </div>
            </div>
            {/* Add more payment items */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 
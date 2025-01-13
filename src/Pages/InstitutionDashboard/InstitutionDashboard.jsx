import React from 'react';
import { 
  FaUsers, FaCalendarAlt, FaBlog, 
  FaChartLine, FaArrowUp, FaArrowDown, 
  FaMedal,
  FaAward,
  FaDollarSign
} from 'react-icons/fa';

function InstitutionDashboard() {
  const stats = [       
    {
      title: 'Total Members',
      value: '200',
      icon: FaUsers,
      change: '-12%',
      isIncrease: false,
    },
    {
      title: 'Events Hosted',
      value: '5',
      icon: FaCalendarAlt,
      change: '0%',
      isIncrease: true,
    },
    {
      title: 'Participation',
      value: '10',
      icon: FaMedal,
      change: '+5%',
      isIncrease: true,
    },
    {
      title: 'Achievements',
      value: '6',
      icon: FaAward,
      change: '0%',
      isIncrease: true,
    },
    // {
    //   title: 'Financial Contributions',
    //   value: '$10,000',
    //   icon: FaDollarSign,
    //   change: '+10%',
    //   isIncrease: true,
    // },
  ];

  const recentActivities = [
    {
      type: 'user',
      message: 'New member registration: John Doe',
      time: '2 minutes ago',
    },
    {
      type: 'blog',
      message: 'New blog post published: "NULASS Annual Conference"',
      time: '1 hour ago',
    },
    {
      type: 'event',
      message: 'Upcoming event: Leadership Summit 2024',
      time: '3 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-full ${
                stat.isIncrease ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.isIncrease ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.isIncrease ? (
                <FaArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <FaArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`ml-2 text-sm ${
                stat.isIncrease ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  {activity.type === 'user' && <FaUsers className="w-5 h-5 text-blue-500" />}
                  {activity.type === 'blog' && <FaBlog className="w-5 h-5 text-green-500" />}
                  {activity.type === 'event' && <FaCalendarAlt className="w-5 h-5 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">{activity.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstitutionDashboard; 
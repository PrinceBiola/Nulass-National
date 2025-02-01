import React, { useState, useEffect } from 'react';
import {
  FaUsers, FaCalendarAlt, FaBlog, FaChartLine, 
  FaArrowUp, FaArrowDown, FaDollarSign, FaUserShield
} from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fechUser } from '../../api/general';
import { fetchPosts } from '../../api/blog';
import { fetchEvents } from '../../api/event';
import { useAuthContext } from '../../context/AuthContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const { user } = useAuthContext();
  const [members, setMembers] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const [events, setEvents] = useState(0);
  const [error, setError] = useState('');
  const [revenue, setRevenue] = useState(25000); // Mock revenue data

  // Mock data for charts
  const userActivityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'User Activity',
      data: [650, 590, 800, 810, 960, 1000],
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
    }]
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [4000, 5000, 6000, 5500, 7000, 7500],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedUser = await fechUser();
        setMembers(fetchedUser.length);

        const fetchedBlogs = await fetchPosts();
        setBlogs(fetchedBlogs.length);

        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents.length);

        console.log('Users:', fetchedUser.length, 'Blogs:', fetchedBlogs.length, 'Events:', fetchedEvents.length);
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    loadData();
  }, []);

  const adminStats = [
    {
      title: 'Total Members',
      value: members,
      icon: FaUsers,
      change: '+12%',
      isIncrease: true,
    },
    {
      title: 'Upcoming Events',
      value: events,
      icon: FaCalendarAlt,
      change: '0%',
      isIncrease: true,
    },
    {
      title: 'Blog Posts',
      value: blogs,
      icon: FaBlog,
      change: '+5%',
      isIncrease: true,
    },
    {
      title: 'Revenue',
      value: '10,243',
      icon: FaChartLine,
      change: '-2%',
      isIncrease: false,
    },
  ];

  // Normal user stats
  const userStats = [
    {
      title: 'Registered Events',
      value: events, 
      icon: FaCalendarAlt,
      // change: '+3%',
      isIncrease: true,
    },
    {
      title: 'Read Blogs',
      value: blogs, // Assume this is fetched separately for the user
      icon: FaBlog,
      change: '+8%',
      isIncrease: true,
    },
    {
      title: 'Profile Completion',
      value: '85%',
      icon: FaUsers,
      change: '+10%',
      isIncrease: true,
    },
    {
      title: 'Active Sessions',
      value: '4',
      icon: FaChartLine,
      change: '0%',
      isIncrease: true,
    },
  ];
  const   SuperAdminStats = [
    {
      title: 'fffff Events',
      value: events, 
      icon: FaCalendarAlt,
      change: '+3%',
      isIncrease: true,
    },
    {
      title: 'ffff Blogs',
      value: blogs, 
      icon: FaBlog,
      change: '+8%',
      isIncrease: true,
    },
    {
      title: 'Profile Completion',
      value: '85%',
      icon: FaUsers,
      change: '+10%',
      isIncrease: true,
    },
    {
      title: 'Active Sessions',
      value: '4',
      icon: FaChartLine,
      change: '0%',
      isIncrease: true,
    },
  ];

  const recentActivities = user?.role === 'admin' ? [
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
  ] : [
    {
      type: 'event',
      message: 'You registered for "Leadership Summit 2024"',
      time: '2 days ago',
    },
    {
      type: 'blog',
      message: 'You read: "NULASS Annual Conference"',
      time: '3 days ago',
    },
    {
      type: 'profile',
      message: 'Updated profile picture',
      time: '5 days ago',
    },
  ];

  const getRoleDisplay = () => {
    switch(user?.role) {
      case 'admin':
        return {
          title: 'Administrator Dashboard',
          badge: 'bg-purple-100 text-purple-800',
          icon: <FaUserShield className="w-6 h-6" />
        };
      case 'normal_user':
        return {
          title: 'Member Dashboard',
          badge: 'bg-blue-100 text-blue-800',
          icon: <FaUsers className="w-6 h-6" />
        };
      case 'superadmin':
        return {
          title: 'Super Administrator Dashboard',
          badge: 'bg-red-100 text-red-800',
          icon: <FaUserShield className="w-6 h-6" />
        };
      default:
        return {
          title: 'Dashboard',
          badge: 'bg-gray-100 text-gray-800',
          icon: <FaUsers className="w-6 h-6" />
        };
    }
  };

  const roleDisplay = getRoleDisplay();

  return (
    <div className="space-y-6 p-6 bg-gray-50">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-4">
          {roleDisplay.icon}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{roleDisplay.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleDisplay.badge}`}>
              {user?.role?.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(user?.role === 'admin' ?   adminStats :  user?.role === "superadmin" ?  SuperAdminStats : userStats).map((stat, index) => (
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

      {/* Charts Section */}
      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">User Activity</h3>
            <Line data={userActivityData} options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
              }
            }} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <Bar data={revenueData} options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
              }
            }} />
          </div>
        </div>
      )}

      
    </div>
  );
}

export default Dashboard;

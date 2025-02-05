
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';


const AdminDashboard = () => {
    const {token} = useAuthContext();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
   
      try {
        const response = await axios.get('http://localhost:5000/api/applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/applications/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application status updated successfully!');
      setApplications(applications.map((app) => (app._id === id ? { ...app, status } : app)));
    } catch (error) {
      console.error(error.response.data);
      alert('Error updating status!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Fullname </th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td className="border border-gray-300 p-2">{app.firstName} {app.lastName}</td>
              <td className="border border-gray-300 p-2">{app.email}</td>
              <td className="border border-gray-300 p-2">{app.status}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => updateStatus(app._id, 'approved')}
                  className="bg-green-500 text-white px-2 py-1 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(app._id, 'rejected')}
                  className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

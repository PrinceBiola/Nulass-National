
import React, { useEffect, useState } from 'react';
import { fechUser } from '../../api/general'; 
import { deleteuser } from '../../api/auth';

function UserManagemnt() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUser = await fechUser();
        setMembers(fetchedUser);
        console.log("Fetched users", fetchedUser.length);
      } catch (error) {
        setError("Failed to fetch users.");
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleDeleteUser = (id) => {
    console.log("Delete user ID:", id);
    setIsModalOpen(true);
    setDeletingUserId(id); 
  };

  const confirmDeleteUser = async () => {
    try {
      await deleteuser({ id: deletingUserId });
      setMembers(members.filter((member) => member._id !== deletingUserId)); 
      setSuccess('User deleted successfully!');
      setIsModalOpen(false); 
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="space-y-6">
   
      {success && (
        <div
          className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 flex items-center justify-between transition-transform duration-500 animate-bounce-in"
          style={{ animation: 'fadeOut 1s ease-in-out forwards 4s' }}
        >
          <div className="flex items-center">
            <span className="material-icons text-green-500 mr-2">check_circle</span>
            <p>{success}</p>
          </div>
          <span className="material-icons text-gray-400 cursor-pointer" onClick={() => setSuccess('')}>
            delete
          </span>
        </div>
      )}

      {/* Error Box */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* User List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">View Members</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by name"
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="ml-4 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Members</option>
            <option value="active">Active Members</option>
            <option value="inactive">Inactive Members</option>
          </select>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.filter((member) => member.name.includes(searchTerm) && (filter === 'all' || member.status === filter)).map((member) => (
              <tr key={member._id} className={member.deleted ? 'opacity-50 text-gray-500' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.deleted ? (
                    <span className="text-gray-400">Deleted</span>
                  ) : (
                    <button onClick={() => handleDeleteUser(member._id)} className="text-red-600 ml-4">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this user?</h3>
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 mr-4 text-gray-600 bg-gray-200 rounded-lg">Cancel</button>
              <button onClick={confirmDeleteUser} className="px-4 py-2 text-white bg-red-600 rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagemnt;

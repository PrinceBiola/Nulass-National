import React, { useState } from 'react';

function MembersManagemnt() {
  const [members, setMembers] = useState([]); // Replace with actual data fetching
  const [pendingMembers, setPendingMembers] = useState([]); // Replace with actual data fetching
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // For active/inactive filtering

  // Example functions to handle member actions
  const approveMember = (id) => {
    // Logic to approve member
  };

  const rejectMember = (id) => {
    // Logic to reject member
  };

  const editUser = (id) => {
    // Logic to edit user
  };

  const deleteUser = (id) => {
    // Logic to delete user
  };

  return (
    <div className="space-y-6">
      {/* View Members Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">View Members</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by name, school, or registration date"
            className="border rounded-lg p-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="ml-4 border rounded-lg p-2"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.filter(member => 
              member.name.includes(searchTerm) && 
              (filter === 'all' || member.status === filter)
            ).map(member => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => editUser(member.id)} className="text-blue-600">Edit</button>
                  <button onClick={() => deleteUser(member.id)} className="text-red-600 ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Approve/Reject New Members Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Approve/Reject New Members</h2>
        <ul className="space-y-2">
          {pendingMembers.map(member => (
            <li key={member.id} className="flex justify-between items-center">
              <span>{member.name}</span>
              <div>
                <button onClick={() => approveMember(member.id)} className="text-green-600">Approve</button>
                <button onClick={() => rejectMember(member.id)} className="text-red-600 ml-4">Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Role Assignment Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Role Assignment</h2>
        <ul className="space-y-2">
          {members.map(member => (
            <li key={member.id} className="flex justify-between items-center">
              <span>{member.name}</span>
              <select
                value={member.role}
                onChange={(e) => {/* Logic to update role */}}
                className="border rounded-lg p-1"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Member">Member</option>
              </select>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MembersManagemnt;

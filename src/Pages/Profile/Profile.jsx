// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Profile() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    profilePicture: null,
  });


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if(userData){
      setUser(userData)
    }
    // if (userData && userData.name) {
    //   setUserName(userData.name);
    // }
  }, []);
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      await axios.put(`${API_URL}/profile`, formDataObj);
      setIsEditing(false);
      // Fetch updated user info
      const response = await axios.get(`${API_URL}/user/1`); // Replace with dynamic user ID
      setUser(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={user.profilePicture || '/default-profile-pic.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user.name} {user.surname}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Save Changes
          </button>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Edit Profile
        </button>
      )}
    </div>
  );
}

export default Profile;

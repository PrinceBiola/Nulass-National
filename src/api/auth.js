import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};



// Login user
export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
 
};

export const sendOtp = async (email) => {
    return await axios.post(`${API_URL}/send-otp`, { email });
};

export const resetPassword = async (data) => {
    return await axios.post(`${API_URL}/reset-password`, data);
};

export const verifyOtp = async (data) => {
    return await axios.post(`${API_URL}/verify-otp`, data);
};

export const updatePassword = async (data) => {
    return await axios.post(`${API_URL}/update-password`, data);
};

export const deleteuser = async ({ id }) => {
    try {
     
      return await axios.delete(`${API_URL}/users/${id}`);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  };
  






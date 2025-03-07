import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_SERVER_URL + '/api';

// Get all applications
export const getApplications = async () => {
  const response = await axios.get(`${API_URL}/admin/applications`);
  return response.data;
};

// Update application status
export const updateApplicationStatus = async (applicationId, data, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/applications/${applicationId}/status`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Export applications to Excel
export const exportApplications = async () => {
  const response = await axios.get(`${API_URL}/admin/applications/export`, {
    responseType: 'blob',
  });
  return response.data;
};

// Get application statistics
export const getApplicationStats = async () => {
  const response = await axios.get(`${API_URL}/admin/applications/stats`);
  return response.data;
};

// Function to get all payments (both online and offline)
export const getAllPayments = async (token) => {
  const response = await axios.get(`${API_URL}/applications/payments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Function to confirm payment
export const confirmPayment = async (paymentId) => {
  const response = await axios.post(`${API_URL}/payments/confirm/${paymentId}`); // Adjust the endpoint as necessary
  return response.data; // Return the updated application data
};

export const getAllApplications = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 
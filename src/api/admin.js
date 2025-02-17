import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

// Get all applications
export const getApplications = async () => {
  const response = await axios.get(`${API_URL}/api/admin/applications`);
  return response.data;
};

// Update application status
export const updateApplicationStatus = async (id, status, rejectionReason = null) => {
  const response = await axios.patch(`${API_URL}/api/admin/applications/${id}/status`, {
    status,
    rejectionReason,
  });
  return response.data;
};

// Export applications to Excel
export const exportApplications = async () => {
  const response = await axios.get(`${API_URL}/api/admin/applications/export`, {
    responseType: 'blob',
  });
  return response.data;
};

// Get application statistics
export const getApplicationStats = async () => {
  const response = await axios.get(`${API_URL}/api/admin/applications/stats`);
  return response.data;
};

// Function to get all payments (both online and offline)
export const getAllPayments = async (token) => {
  const response = await axios.get(`${API_URL}/api/applications/payments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Function to confirm payment
export const confirmPayment = async (paymentId) => {
  const response = await axios.post(`${API_URL}/api/payments/confirm/${paymentId}`); // Adjust the endpoint as necessary
  return response.data; // Return the updated application data
}; 
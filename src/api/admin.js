import axios from 'axios';

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
export const getAllPayments = async () => {
  const response = await axios.get('/api/payments/all'); // Adjust the endpoint as necessary
  return response.data; // Return the data from the response
};

// Function to confirm payment
export const confirmPayment = async (paymentId) => {
  const response = await axios.post(`/api/payments/confirm/${paymentId}`); // Adjust the endpoint as necessary
  return response.data; // Return the updated application data
}; 
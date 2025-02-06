import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Verify online payment
export const verifyPayment = async ({ reference, applicationId }, token) => {
  try {
    const response = await axios.post(`${API_URL}/api/payment/verify`, 
      { reference, applicationId },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Payment verification failed' };
  }
};

// Upload offline payment receipt
export const uploadOfflinePayment = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/api/payment/offline-payment`, 
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to upload receipt' };
  }
};

// Get payment receipt
export const getPaymentReceipt = async (applicationId) => {
  try {
    const response = await api.get(`/api/payment/receipt/${applicationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 
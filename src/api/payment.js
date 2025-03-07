import axios from 'axios';
const API_URL = import.meta.env.VITE_SERVER_URL + '/api/payment';

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
export const verifyPayment = async (verificationData, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${API_URL}/verify`,
      verificationData,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Upload offline payment receipt
export const uploadOfflinePayment = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/offline-payment`, 
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
    const response = await api.get(`/receipt/${applicationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

// Initialize payment
export const initializePayment = async (paymentData, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${API_URL}/initialize`,
      paymentData,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 
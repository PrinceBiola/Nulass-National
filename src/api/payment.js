import axios from 'axios';
import { API_URL } from '../config';

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
export const verifyPayment = async (reference) => {
  try {
    const response = await api.post('/api/payment/verify', { reference });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Payment verification failed' };
  }
};

// Upload offline payment receipt
export const uploadOfflinePayment = async (formData) => {
  try {
    const response = await api.post('/api/payment/offline', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
    throw error.response?.data || { message: 'Failed to get receipt' };
  }
}; 
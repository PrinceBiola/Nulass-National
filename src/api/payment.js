import axios from 'axios';
const API_URL = import.meta.env.VITE_SERVER_URL + '/api/applications';
const URL = import.meta.env.VITE_SERVER_URL + '/api/payment';

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
    console.log('Verifying payment with data:', verificationData);
    
    const response = await axios.post(
      `${URL}/verify-payment`,
      verificationData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log('Verification response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Verification error:', error.response?.data || error.message);
    throw error.response?.data || error;
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

export const initiatePayment = async (applicationId, token) => {
  try {
    console.log('Initiating payment for application:', applicationId);
    
    const response = await axios.post(
      `${API_URL}/initialize-payment`,
      { applicationId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('Payment initialization response:', response.data);

    if (response.data.data && response.data.data.authorization_url) {
      window.location.href = response.data.data.authorization_url;
      return response.data;
    } else {
      throw new Error('Invalid payment response');
    }
  } catch (error) {
    console.error('Payment Error:', error.response?.data || error);
    throw {
      message: error.response?.data?.message || 'Payment initialization failed',
      details: error.response?.data?.details || error.message
    };
  }
};

export const getPaymentStatus = async (reference, token) => {
  try {
    const response = await axios.get(`${API_URL}/status/${reference}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get payment status' };
  }
};

export const getUserApplication = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/applications/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const downloadMembershipCard = async (applicationId, token) => {
  try {
    const response = await axios.get(
      `${API_URL}/applications/${applicationId}/card`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 
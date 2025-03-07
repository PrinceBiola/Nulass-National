import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + '/api';

export const fechUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; 
    }
};

// Application User  user
export const ApplyUser = async (data, token) => {
    return await axios.post(`${API_URL}/apply`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
          }          
    });
};

// Get user's application
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

// Create application
export const createApplication = async (formData, token) => {
    try {
        const response = await axios.post(`${API_URL}/applications`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Generate QR Code for ID Card
export const generateQRCode = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/qrcode/generate`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};

// Get User ID Card
export const getUserIdCard = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/idcard/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching ID card:', error);
        throw error;
    }
};

export const makePayment = async (applicationId, token) => {
    try {
        const response = await fetch(`${API_URL}/api/applications/${applicationId}/pay`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    } catch (error) {
        throw error;
    }
};

// Get user's application history
export const getUserApplicationHistory = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/applications/history`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};






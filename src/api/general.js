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

// Function to get user application by user ID
export const getUserApplication = async (userId, token) => {
    const response = await axios.get(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data; 
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






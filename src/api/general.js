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
    const response = await axios.get(`${API_URL}/applications/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data; // Return the application data
};






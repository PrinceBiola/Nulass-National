import axios from "axios";

const API_URL = 'http://localhost:5000/api';


export const fechUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data; 
    } catch (error) {

        console.error('Error fetching users:', error);
        throw error; 
    }
};



// Register user
export const ApplyUser = async (data, token) => {
    return await axios.post(`${API_URL}/apply`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
          }          
    });
    
  };




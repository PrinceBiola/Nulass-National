import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL + '/api';

// Fetch all blog posts
export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/blogs`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; 
    }
};
export const fetchCourse = async () => {
    try {
        const response = await axios.get(`${API_URL}/course`);
        console.log("response farrr", response)
        return response.data; 
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; 
    }
};



// Create a new blog post
export const createPost = async (postData) => {
    try {
        const response = await axios.post(`${API_URL}/blogs`, postData);
        return response.data;
        
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

// Update an existing blog post
export const updatePost = async (postId, postData) => {
    try {
        const response = await axios.put(`${API_URL}/blogs/${postId}`, postData);
        return response.data; 
        
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

// Delete a blog post
export const deletePost = async (postId) => {
    try {
        await axios.delete(`${API_URL}/blogs/${postId}`);
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};
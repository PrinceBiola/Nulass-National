import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL + '/api/events';

// Helper function to get auth header
const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
});

// Fetch all events
export const fetchEvents = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch events';
        console.error('Fetch events error:', error);
        throw new Error(message);
    }
};

// Fetch 3 latest events
export const fetchLatestEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/latest`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch latest events';
        console.error('Fetch latest events error:', error);
        throw new Error(message);
    }
};

// Create a new event
export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to create event';
        console.error('Create event error:', error);
        throw new Error(message);
    }
};

// Update an existing event
export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await axios.put(`${API_URL}/${eventId}`, eventData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to update event';
        console.error('Update event error:', error);
        throw new Error(message);
    }
};

// Delete an event
export const deleteEvent = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: getAuthHeader()
        });
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete event';
        console.error('Delete event error:', error);
        throw new Error(message);
    }
};

// Get single event
export const getEvent = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch event';
        console.error('Get event error:', error);
        throw new Error(message);
    }
};

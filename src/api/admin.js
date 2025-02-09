import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get all applications
export const getApplications = async () => {
  const response = await axios.get(`${API_URL}/api/admin/applications`);
  return response.data;
};

// Update application status
export const updateApplicationStatus = async (id, status, rejectionReason = null) => {
  const response = await axios.patch(`${API_URL}/api/admin/applications/${id}/status`, {
    status,
    rejectionReason,
  });
  return response.data;
};

// Export applications to Excel
export const exportApplications = async () => {
  const response = await axios.get(`${API_URL}/api/admin/applications/export`, {
    responseType: 'blob',
  });
  return response.data;
};

// Get application statistics
export const getApplicationStats = async () => {
  const response = await axios.get(`${API_URL}/api/admin/applications/stats`);
  return response.data;
}; 
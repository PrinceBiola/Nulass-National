import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import UploadFormInput from '../UploadFormInput/UploadFormInput';
import UploadFormTextarea from '../UploadFormInput/UploadFormTextarea';
import { ApplyUser } from '../../api/general';
import { toast } from 'react-toastify';

const ApplicationForm = ({ onSuccess }) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phoneNumber: '',
    NIN: '',
    institution: '',
    department: '',
    level: '',
    matricNumber: '',
    address: '',
    lgaOfOrigin: '',
    stateOfResidence: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      await ApplyUser(formDataToSend, user.token);
      toast.success('Application submitted successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UploadFormInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <UploadFormInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <UploadFormInput
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <UploadFormInput
          label="NIN"
          name="NIN"
          value={formData.NIN}
          onChange={handleChange}
          required
        />
        <UploadFormInput
          label="Institution"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          required
        />
        <UploadFormInput
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <UploadFormInput
          label="Level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
        />
        <UploadFormInput
          label="Matric Number"
          name="matricNumber"
          value={formData.matricNumber}
          onChange={handleChange}
          required
        />
        <UploadFormTextarea
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <UploadFormInput
          label="LGA of Origin"
          name="lgaOfOrigin"
          value={formData.lgaOfOrigin}
          onChange={handleChange}
          required
        />
        <UploadFormInput
          label="State of Residence"
          name="stateOfResidence"
          value={formData.stateOfResidence}
          onChange={handleChange}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-customGreen text-white py-3 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
};

export default ApplicationForm; 
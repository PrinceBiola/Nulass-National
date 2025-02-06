import axios from 'axios';
import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import PaystackButton from '../../Components/PaystackButton';
import { ApplyUser } from '../../api/general';
import UploadFormInput from '../../Components/UploadFormInput/UploadFormInput';
import UploadFormTextarea from '../../Components/UploadFormInput/UploadFormTextarea';
// import PaymentModal from './PaymentModal';
import { toast } from 'react-toastify';
import PaymentModal from '../../Components/PaymentModal';

const ApplicationForm = () => {
  const { token, user } = useAuthContext();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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

  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const imageFile = document.getElementById('imageUpload').files[0];
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await ApplyUser(formDataToSend, token);
      setShowPaymentModal(true);
    } catch (error) {
      toast.error('Error submitting application!');
    }
  };

  const closeModal = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Student ID Application</h1>
            <p className="mt-2 text-gray-600">Please fill in your details accurately</p>
          </div>

          {/* Application Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-12">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  1
                </div>
                <span className="mt-2 text-sm">Personal Info</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200">
                <div className="h-full bg-green-500 w-1/3"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  2
                </div>
                <span className="mt-2 text-sm">Payment</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  3
                </div>
                <span className="mt-2 text-sm">Confirmation</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="space-y-6 p-6">
              {/* Image Upload Section */}
              <div className="relative group">
                <input
                  type="file"
                  onChange={uploadImage}
                  className="hidden"
                  id="imageUpload"
                  accept="image/*"
                />
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
                >
                  {formData.image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.image}
                        alt="Upload preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-gray-500">Click to upload your photo</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Input Fields */}
              <UploadFormInput
                label="First Name"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                name="firstName"
                required
              />
              <UploadFormInput
                label="Last Name"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                name="lastName"
                required
              />
              <UploadFormInput
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                name="email"
                required
              />
              <UploadFormInput
                label="Phone Number"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                name="phoneNumber"
                required
              />
              <UploadFormInput
                label="NIN"
                placeholder="Enter your NIN"
                value={formData.NIN}
                onChange={(e) => handleChange('NIN', e.target.value)}
                name="NIN"
                required
              />
              <UploadFormInput
                label="Institution"
                placeholder="Enter your institution"
                value={formData.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
                name="institution"
                required
              />
              <UploadFormInput
                label="Department"
                placeholder="Enter your department"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                name="department"
                required
              />
              <UploadFormInput
                label="Level"
                placeholder="Enter your level"
                value={formData.level}
                onChange={(e) => handleChange('level', e.target.value)}
                name="level"
                required
              />
              <UploadFormInput
                label="Matric Number"
                placeholder="Enter your matric number"
                value={formData.matricNumber}
                onChange={(e) => handleChange('matricNumber', e.target.value)}
                name="matricNumber"
                required
              />
              <UploadFormInput
                label="Address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                name="address"
                required
              />
              <UploadFormInput
                label="LGA of Origin"
                placeholder="Enter your LGA of origin"
                value={formData.lgaOfOrigin}
                onChange={(e) => handleChange('lgaOfOrigin', e.target.value)}
                name="lgaOfOrigin"
                required
              />
              <UploadFormInput
                label="State of Residence"
                placeholder="Enter your state of residence"
                value={formData.stateOfResidence}
                onChange={(e) => handleChange('stateOfResidence', e.target.value)}
                name="stateOfResidence"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        applicationData={formData}
      />
    </div>
  );
};

export default ApplicationForm;

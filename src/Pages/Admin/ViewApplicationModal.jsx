import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ViewApplicationModal = ({ isOpen, onClose, application }) => {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Application Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>

          {/* Profile Image Section */}
          <div className="mb-6 flex justify-center">
            {application.image ? (
              <div className="relative">
                <img 
                  src={`${import.meta.env.VITE_SERVER_URL}/${application.image}`}
                  alt="Profile" 
                  className="w-40 h-40 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 right-0 bg-white px-2 py-1 rounded-tl-lg text-sm">
                  Profile Photo
                </div>
              </div>
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No image uploaded</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
              <div className="space-y-3">
                <p><span className="font-medium">Full Name:</span> {application.firstName} {application.lastName}</p>
                <p><span className="font-medium">Email:</span> {application.email}</p>
                <p><span className="font-medium">Phone:</span> {application.phoneNumber}</p>
                <p><span className="font-medium">Address:</span> {application.address}</p>
                <p><span className="font-medium">LGA of Origin:</span> {application.lgaOfOrigin}</p>
                <p><span className="font-medium">State of Residence:</span> {application.stateOfResidence}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Academic Information</h3>
              <div className="space-y-3">
                <p><span className="font-medium">Institution:</span> {application.institution}</p>
                <p><span className="font-medium">Department:</span> {application.department}</p>
                <p><span className="font-medium">Level:</span> {application.level}</p>
                <p><span className="font-medium">Matric Number:</span> {application.matricNumber}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-4">Application Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${application.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                    application.status === 'approved' ? 'bg-green-100 text-green-800' :
                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    application.status === 'payment_pending' ? 'bg-blue-100 text-blue-800' :
                    application.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {application.status}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="font-medium">Payment Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${application.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {application.paymentStatus}
                </span>
              </div>

              <p><span className="font-medium">Application Date:</span> {new Date(application.createdAt).toLocaleDateString()}</p>
              
              {application.rejectionReason && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">
                    <span className="font-medium">Rejection Reason:</span> {application.rejectionReason}
                  </p>
                </div>
              )}

              {application.idCardNumber && (
                <p><span className="font-medium">ID Card Number:</span> {application.idCardNumber}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationModal;
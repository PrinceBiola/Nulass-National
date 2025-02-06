import React from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import { formatDate } from '../../Helper/helper';
// import { formatDate } from '../../utils/helpers';

const ViewApplicationModal = ({ isOpen, onClose, application }) => {
  if (!application) return null;

  return (
    <HeadlessDialog 
      open={isOpen} 
      onClose={onClose} 
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <HeadlessDialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6">
          <div className="flex justify-between items-start mb-6">
            <HeadlessDialog.Title className="text-2xl font-bold">
              Application Details
            </HeadlessDialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
              
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={application.image} 
                  alt="Applicant" 
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <p className="mt-1">{`${application.firstName} ${application.lastName}`}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="mt-1">{application.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="mt-1">{application.phoneNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">NIN</label>
                  <p className="mt-1">{application.NIN}</p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Academic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Institution</label>
                  <p className="mt-1">{application.institution}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Department</label>
                  <p className="mt-1">{application.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Level</label>
                  <p className="mt-1">{application.level}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Matric Number</label>
                  <p className="mt-1">{application.matricNumber}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Payment Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Status</label>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-sm ${
                    application.paymentStatus === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {application.paymentStatus}
                  </span>
                </div>
                {application.paymentReference && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Reference</label>
                    <p className="mt-1">{application.paymentReference}</p>
                  </div>
                )}
              </div>
              {application.paymentReceipt && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">Receipt</label>
                  <a 
                    href={application.paymentReceipt} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Receipt
                  </a>
                </div>
              )}
            </div>

            {/* Application Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Application Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Status</label>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-sm ${
                    application.status === 'approved' ? 'bg-green-100 text-green-800' :
                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Submitted On</label>
                  <p className="mt-1">{formatDate(application.createdAt)}</p>
                </div>
              </div>
              {application.rejectionReason && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">Rejection Reason</label>
                  <p className="mt-1 text-red-600">{application.rejectionReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HeadlessDialog>
  );
};

export default ViewApplicationModal; 
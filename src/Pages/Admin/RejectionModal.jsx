import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { updateApplicationStatus } from '../../api/admin';
import { toast } from 'react-toastify';

const RejectionModal = ({ isOpen, onClose, application, onReject }) => {
  const [reason, setReason] = useState('');

  const handleReject = async () => {
    try {
      if (!reason.trim()) {
        toast.error('Please provide a rejection reason');
        return;
      }

      await updateApplicationStatus(application._id, 'rejected', reason);
      toast.success('Application rejected successfully');
      onReject();
      onClose();
    } catch (error) {
      toast.error('Error rejecting application');
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-white p-6">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Reject Application
          </Dialog.Title>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rejection Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-lg p-2 h-32"
              placeholder="Please provide a reason for rejection..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RejectionModal; 
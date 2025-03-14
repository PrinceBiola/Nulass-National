import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { initiatePayment } from '../api/payment';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PaymentModal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  applicationData = null
}) => {
  const { token } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!applicationData?._id) {
      toast.error('Invalid application data');
      return;
    }

    setIsProcessing(true);
    try {
      await initiatePayment(applicationData._id, token);
      // Redirect will happen in initiatePayment
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error(error.message || 'Payment initialization failed');
      setIsProcessing(false);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={() => !isProcessing && onClose()}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-white p-6">
          <Dialog.Title className="text-xl font-semibold mb-4">
            NULASS Membership Payment
          </Dialog.Title>

          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-blue-800">Amount: ₦5,000</p>
              <p className="text-sm text-blue-600 mt-1">Application Number: {applicationData?.applicationNumber}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Click proceed to complete your payment securely via Paystack.
            </p>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </button>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="w-full border py-2 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PaymentModal; 
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { usePaystackPayment } from 'react-paystack';
import { verifyPayment } from '../api/payment';
import { useAuthContext } from '../context/AuthContext';
import StatusModal from './StatusModal';

const PaymentModal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  applicationData = null, 
  onPaymentSuccess = () => {} 
}) => {
  const { token, user } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusModal, setStatusModal] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Add validation for required props
  if (!applicationData || !applicationData._id || !user?.email) {
    console.error('Missing required data for payment');
    return null;
  }

  const config = {
    reference: `${Date.now()}_${applicationData._id}`,
    email: user.email,
    amount: 5000 * 100, // Amount in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    metadata: {
      applicationId: applicationData._id,
      userId: user._id
    }
  };

  const onSuccess = async (reference) => {
    setIsProcessing(true);
    try {
      await verifyPayment({
        reference: reference.reference,
        applicationId: applicationData._id
      }, token);

      setStatusModal({
        show: true,
        type: 'success',
        message: 'Payment successful! Our admin team will review your application and send you an email once your ID is approved.'
      });
      
      setTimeout(() => {
        onPaymentSuccess();
      }, 2000);
    } catch (error) {
      setStatusModal({
        show: true,
        type: 'error',
        message: error.response?.data?.message || 'Error verifying payment'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onClose2 = () => {
    setIsProcessing(false);
    console.log('Payment cancelled');
  };

  const initializePaystack = usePaystackPayment(config);

  const handlePayment = () => {
    setIsProcessing(true);
    initializePaystack(onSuccess, onClose2);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setIsProcessing(false);
      setStatusModal({
        show: false,
        type: 'success',
        message: ''
      });
      onClose();
    }
  };

  return (
    <>
      <Dialog 
        open={isOpen} 
        onClose={handleClose}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-white p-6">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Payment for Member ID Application
            </Dialog.Title>

            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium text-blue-800">Amount to Pay: ₦5,000</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                You will be redirected to Paystack to complete your payment securely.
              </p>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </button>
              <button
                onClick={handleClose}
                disabled={isProcessing}
                className="w-full border py-2 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <StatusModal
        isOpen={statusModal.show}
        onClose={() => setStatusModal({ ...statusModal, show: false })}
        type={statusModal.type}
        message={statusModal.message}
      />
    </>
  );
};

export default PaymentModal; 
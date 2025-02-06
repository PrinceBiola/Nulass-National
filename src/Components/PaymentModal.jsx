import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'react-toastify';
import { verifyPayment, uploadOfflinePayment } from '../api/payment';
import { API_URL } from '../config';

const PaymentModal = ({ isOpen, onClose, applicationData }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const config = {
    reference: new Date().getTime().toString(),
    email: applicationData?.email,
    amount: 5000 * 100, // 5000 Naira in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePaystack = usePaystackPayment(config);

  const handlePaystackSuccess = async (reference) => {
    try {
      await verifyPayment(reference);
      toast.success('Payment successful!');
      onClose();
    } catch (error) {
      toast.error('Error verifying payment');
    }
  };

  const handleOfflinePayment = async () => {
    if (!receipt) {
      toast.error('Please select a receipt file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('receipt', receipt);
      formData.append('applicationId', applicationData.id);
      
      await uploadOfflinePayment(formData);
      toast.success('Receipt uploaded successfully');
      onClose();
    } catch (error) {
      toast.error('Error uploading receipt');
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
            Choose Payment Method
          </Dialog.Title>

          <div className="space-y-4">
            {!paymentMethod && (
              <>
                <button
                  onClick={() => setPaymentMethod('online')}
                  className="w-full p-4 text-left border rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium">Pay Online</div>
                  <div className="text-sm text-gray-500">Pay instantly with card</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('offline')}
                  className="w-full p-4 text-left border rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium">Pay Offline</div>
                  <div className="text-sm text-gray-500">Upload payment receipt</div>
                </button>
              </>
            )}

            {paymentMethod === 'online' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  You will be redirected to Paystack to complete your payment of ₦5,000
                </p>
                <button
                  onClick={() => {
                    initializePaystack(handlePaystackSuccess, () => {
                      setPaymentMethod(null);
                    });
                  }}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={() => setPaymentMethod(null)}
                  className="w-full border py-2 rounded-lg"
                >
                  Back
                </button>
              </div>
            )}

            {paymentMethod === 'offline' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Receipt
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setReceipt(e.target.files[0])}
                    className="w-full border rounded-lg p-2"
                    accept="image/*,.pdf"
                  />
                </div>
                <button
                  onClick={handleOfflinePayment}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                >
                  Submit Receipt
                </button>
                <button
                  onClick={() => setPaymentMethod(null)}
                  className="w-full border py-2 rounded-lg"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PaymentModal; 
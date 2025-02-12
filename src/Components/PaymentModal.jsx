import React, { useState, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { usePaystackPayment } from 'react-paystack';
import { useDropzone } from 'react-dropzone';
import { verifyPayment, uploadOfflinePayment } from '../api/payment';
import { useAuthContext } from '../context/AuthContext';
import StatusModal from './StatusModal';
// make sure u understand this code is connected to my page read and understand 
const PaymentModal = ({ isOpen, onClose, applicationData, onPaymentSuccess }) => {
  const { token } = useAuthContext();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusModal, setStatusModal] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Add console.log to debug applicationData
  console.log('Application Data:', applicationData);

  // Bank Account Details
  const bankDetails = {
    bankName: "First Bank",
    accountNumber: "0123456789",
    accountName: "NULLAS Member ID",
    amount: "₦5,000"
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: applicationData?.email,
    amount: 5000 * 100,
    publicKey: 'pk_test_8ba0442163c9e7f0e0817c6dd94622a9829b35f2', // this is the public key for paystack
    onSuccess: (reference) => handlePaystackSuccess(reference),
    onClose: () => {
      setIsProcessing(false);
      setPaymentMethod(null);
    }
  };

  const initializePaystack = usePaystackPayment(config);

  const handlePaystackSuccess = async (reference) => {
      console.log("refrence", reference)
    setIsProcessing(true);
    try {
      if (!applicationData?._id && !applicationData?.id) {
        throw new Error('Application ID is missing');
      }

      await verifyPayment({
        reference,
        applicationId: applicationData._id || applicationData.id
      }, token);

      setStatusModal({
        show: true,
        type: 'success',
        message: 'Payment successful! Our admin team will review your application and send you an email once your ID is approved.'
      });
      
      // Call onPaymentSuccess after 2 seconds and redirect to dashboard
      setTimeout(() => {
        onPaymentSuccess();
        window.location.href = '/user-order';
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

  // Drag and drop functionality
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0]) {
      setReceipt(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxSize: 5242880 // 5MB 
  });

  const handleOfflinePayment = async () => {
    if (!receipt) {
      setStatusModal({
        show: true,
        type: 'error',
        message: 'Please upload your payment receipt'
      });
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('receipt', receipt);
      formData.append('applicationId', applicationData._id || applicationData.id);
      
      await uploadOfflinePayment(formData, token);
      setStatusModal({
        show: true,
        type: 'success',
        message: 'Receipt uploaded successfully! Our admin team will verify your payment and send you an email once your ID is approved.'
      });

      // Call onPaymentSuccess after 2 seconds and redirect to dashboard
      setTimeout(() => {
        onPaymentSuccess();
        window.location.href = '/user-order';
      }, 2000);
    } catch (error) {
      setStatusModal({
        show: true,
        type: 'error',
        message: error.response?.data?.message || 'Error uploading receipt'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Dialog 
        open={isOpen} 
        onClose={onClose}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-white p-6">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Payment for Member ID Application
            </Dialog.Title>

            <div className="mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium text-blue-800">Amount to Pay: ₦5,000</p>
              </div>
            </div>

            <div className="space-y-4">
              {!paymentMethod && (
                <>
                  <button
                    onClick={() => setPaymentMethod('online')}
                    className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="font-medium">Pay Online</div>
                    <div className="text-sm text-gray-500">Pay instantly with card via Paystack</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('offline')}
                    className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="font-medium">Pay Offline</div>
                    <div className="text-sm text-gray-500">Bank transfer/deposit and upload receipt</div>
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
                      setIsProcessing(true);
                      initializePaystack();
                    }}
                    disabled={isProcessing}
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                  <button
                    onClick={() => setPaymentMethod(null)}
                    disabled={isProcessing}
                    className="w-full border py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                </div>
              )}

              {paymentMethod === 'offline' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <h3 className="font-medium">Bank Account Details</h3>
                    {Object.entries(bankDetails).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Payment Receipt
                    </label>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition
                        ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <input {...getInputProps()} />
                      <div className="text-center space-y-2">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="text-gray-600">
                          {receipt ? receipt.name : 'Drag and drop your receipt here, or click to select'}
                        </div>
                        <p className="text-xs text-gray-500">
                          Supported formats: JPG, PNG, PDF (max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleOfflinePayment}
                    disabled={!receipt || isProcessing}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    {isProcessing ? 'Processing...' : 'Submit Receipt'}
                  </button>
                  <button
                    onClick={() => setPaymentMethod(null)}
                    disabled={isProcessing}
                    className="w-full border py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Status Modal */}
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
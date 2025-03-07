import React, { useState, useEffect } from "react";
import Logo from "../../assets/Images/Logo.png";
import Modal from "react-modal";
import { FaIdCard, FaTimes } from "react-icons/fa";
import html2canvas from "html2canvas";
import { generateQRCode, getUserApplication } from "../../api/general";
import { initializePayment, verifyPayment } from "../../api/payment";
import { useAuthContext } from "../../context/AuthContext";
import { usePaystackPayment } from 'react-paystack';

function IdCard() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    fetchApplication();
  }, [user.token]);

  const fetchApplication = async () => {
    try {
      const data = await getUserApplication(user.token);
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      
      // Initialize payment with Paystack
      const paymentData = {
        email: application.email,
        amount: application.applicationFee * 100, // Convert to kobo
        metadata: {
          applicationId: application._id,
          userId: user._id,
        }
      };

      const config = {
        reference: (new Date()).getTime().toString(),
        email: application.email,
        amount: application.applicationFee * 100,
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        metadata: {
          applicationId: application._id,
          userId: user._id,
        },
      };

      const initializePaymentObject = usePaystackPayment(config);

      // Define callback functions
      const onSuccess = async (reference) => {
        try {
          // Verify the payment on your backend
          await verifyPayment(reference, user.token);
          // Refresh application data to show updated status
          await fetchApplication();
        } catch (error) {
          console.error('Payment verification failed:', error);
          alert('Payment verification failed. Please contact support.');
        }
      };

      const onClose = () => {
        alert('Payment window closed. Please try again.');
      };

      // Initialize payment
      initializePaymentObject(onSuccess, onClose);

    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Failed to initialize payment. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customGreen"></div>
    </div>;
  }

  if (!application) {
    return <div className="p-4 text-center text-gray-600">No application found</div>;
  }

  if (application.status !== 'completed') {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">ID Card Status</h2>
          
          {application.status === 'under_review' && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">
                Your application is currently under review. Please check back later.
              </p>
            </div>
          )}

          {application.status === 'payment_pending' && (
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <p className="text-green-700 font-semibold">
                  Congratulations! Your application has been approved!
                </p>
              </div>
              
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <p className="text-gray-600 mb-4">
                  Please proceed with the payment of ₦{application.applicationFee.toLocaleString()} to generate your ID card.
                </p>
                
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className={`w-full bg-customGreen text-white py-3 rounded-lg font-semibold
                    ${paymentLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
                >
                  {paymentLoading ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="id-card-container">
        {/* Your ID card design here */}
        <h2>NULASS ID Card</h2>
        <p>ID Number: {application.idCardNumber}</p>
        <p>Name: {application.firstName} {application.lastName}</p>
        <p>Institution: {application.institution}</p>
        {/* Add more ID card details */}
      </div>
    </div>
  );
}

export default IdCard;

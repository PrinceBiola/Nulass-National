import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const PaystackButton = ({ amount, orderId, onSuccess }) => {
  const { user } = useAuthContext();
  const { token } = useAuthContext();

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: amount * 100,
    publicKey: 'pk_test_8ba0442163c9e7f0e0817c6dd94622a9829b35f2',
  };

  console.log("Paystack Config:", config);

  const handlePaymentSuccess = async (reference) => {
    
 
    
    try {
        console.log("gggggvvvvvvvvvvvv")
        console.log("handlePaymentSuccess Triggered:", reference);

      const response = await axios.post(

        'http://localhost:5000/api/verify-payment',

        {
          reference: reference.reference,
          applicationId: orderId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Backend Verification Response:", response.data); 
      onSuccess(response.data);
    } catch (error) {
      console.error('Error Verifying Payment:', error?.response?.data || error.message);
      alert('Payment verification failed.');
    }
  };

  const initializePayment = usePaystackPayment(config);
  console.log("initailsxing", initializePayment)

  const startPayment = () =>
    initializePayment(
      (reference) => {
        console.log("Payment Completed, Reference:", reference);
        handlePaymentSuccess(reference);
        onSuccess(handlePaymentSuccess)
      },
      () => {
        console.log("Payment Cancelled");
        alert('Payment cancelled');
      }
    );

  return (
    <button
      onClick={startPayment}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Pay Now
    </button>
  );
};

export default PaystackButton;

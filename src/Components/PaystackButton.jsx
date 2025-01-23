import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';


const PaystackButton = ({ amount, orderId, onSuccess }) => {
    const { user } = useAuthContext();
    const { token } = useAuthContext();
    console.log("amount", amount)
  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: amount * 100,
    publicKey: 'pk_test_8ba0442163c9e7f0e0817c6dd94622a9829b35f2',
  };

  const handlePaymentSuccess = async (reference) => {
    try {
    //   const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/verify-payment',
        { reference: reference.reference, applicationId: orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess(response.data);
    } catch (error) {
      console.error('Payment verification failed:', error.response.data);
      alert('Error verifying payment.');
    }
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button
      onClick={() =>
        initializePayment(handlePaymentSuccess, () => alert('Payment cancelled'))
      }
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Pay Now
    </button>
  );
};

export default PaystackButton;

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyPayment } from '../../api/payment';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const PaymentVerification = () => {
  const [verifying, setVerifying] = useState(true);
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const verify = async () => {
      try {
        // Get reference from URL parameters
        const params = new URLSearchParams(location.search);
        const reference = params.get('reference') || params.get('trxref');

        if (!reference) {
          toast.error('No payment reference found');
          navigate('/dashboard');
          return;
        }

        console.log('Verifying payment reference:', reference);
        
        const result = await verifyPayment({ reference }, token);
        
        if (result.success) {
          toast.success('Payment verified successfully!');
          navigate(`/dashboard/payment/success?reference=${reference}`);
        } else {
          toast.error(result.message || 'Verification failed');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Verification failed:', error);
        toast.error(error.message || 'Payment verification failed');
        navigate('/dashboard');
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [location.search, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Verifying your payment...</h2>
        <p className="mt-2 text-gray-500">Please wait while we confirm your payment</p>
      </div>
    </div>
  );
};

export default PaymentVerification; 
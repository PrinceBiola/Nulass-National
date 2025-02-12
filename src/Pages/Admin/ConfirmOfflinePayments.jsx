import React, { useState, useEffect } from 'react';
import { getAllPayments, confirmPayment } from '../../api/admin'; // Adjust the import based on your API structure
import { toast } from 'react-toastify';

const ConfirmPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const fetchAllPayments = async () => {
    try {
      const data = await getAllPayments(); // Fetch all payments from the API
      if (Array.isArray(data)) {
        setPayments(data); // Set payments only if data is an array
      } else {
        throw new Error('Unexpected response format'); // Handle unexpected response
      }
    } catch (error) {
      toast.error('Error fetching payments: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async (paymentId) => {
    try {
      const updatedApplication = await confirmPayment(paymentId); // Confirm the payment using the API
      toast.success('Payment confirmed successfully');
      // Update the application status in the local state
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === paymentId ? { ...payment, status: 'paid' } : payment
        )
      );
      fetchAllPayments(); // Refresh the payment list
    } catch (error) {
      toast.error('Error confirming payment');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Confirm Payments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Payment Method</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{payment.name}</td>
                <td className="px-6 py-4">{payment.email}</td>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className="px-6 py-4">{payment.method}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    payment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {payment.status === 'pending' && (
                    <button
                      onClick={() => handleConfirmPayment(payment._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmPayments; 
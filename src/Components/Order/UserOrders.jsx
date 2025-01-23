import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaystackButton from '../PaystackButton';
import { useAuthContext } from '../../context/AuthContext';

const UserOrders = () => {
    const {token} = useAuthContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
     
      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchOrders();
  }, []);

  const handlePaymentSuccess = (updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="p-4 border rounded-md">
            <p><strong>Application:</strong> {order.application.firstName} {order.application.lastName}</p>
            <p><strong>Application Email:</strong> {order.application.email} {order.application.lastName}</p>

            <p><strong>Status:</strong> {order.paymentStatus}</p>
            {order.paymentStatus === 'unpaid' && (
              <PaystackButton
                amount={500} 
                orderId={order._id}
                onSuccess={handlePaymentSuccess}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrders;

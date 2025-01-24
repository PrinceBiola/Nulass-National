import React, { useState, useEffect } from "react";
import axios from "axios";
import PaystackButton from "../PaystackButton";
import { useAuthContext } from "../../context/AuthContext";

const UserOrders = () => {
  const { token } = useAuthContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchOrders();
  }, [token]);

  const handlePaymentSuccess = (updatedOrder) => {
    console.log("Updated Order Received in UserOrders:", updatedOrder);
    setOrders(
      orders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Your Orders
      </h1>
      <ul className="space-y-6">
        {orders.map((order) => (
          <li
            key={order._id}
            className="p-6 bg-white shadow-md rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {order.application?.firstName} {order.application?.lastName}
              </p>
              <p className="text-sm text-gray-600">
                Email: {order.application?.email}
              </p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
            </div>
            {order.paymentStatus === "unpaid" && (
                
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

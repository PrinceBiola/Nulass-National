import axios from 'axios';
import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import PaystackButton from '../../Components/PaystackButton';
import { ApplyUser } from '../../api/general';
// import PaystackButton from './PaystackButton';

const ApplicationForm = () => {
  const { token } = useAuthContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    institution: '',
    department: '',
    level: '',
    matricNumber: '',
    address: '',
    lgaOfOrigin: '',
    stateOfResidence: '',
  });

  const [application, setApplication] = useState(null); // Store application details after submission

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/apply', formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert('Application submitted successfully!');
//       setApplication(response.data);
//     } catch (error) {
//       console.error(error.response.data);
//       alert('Error submitting application!');
//     }
//   };

console.log("token", token)
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await ApplyUser(formData, token);
      alert('Application submitted successfully!');
      setApplication(response.data); 
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Error submitting application!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Apply for ID</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {application && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Proceed to Payment</h2>
          <PaystackButton
            amount={5000}
            orderId={application._id}
            onSuccess={(data) => {
              alert('Payment successful!');
              console.log(data);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;

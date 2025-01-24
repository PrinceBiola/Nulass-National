// // import axios from 'axios';
// // import React, { useState } from 'react';
// // import { useAuthContext } from '../../context/AuthContext';
// // import PaystackButton from '../../Components/PaystackButton';
// // import { ApplyUser } from '../../api/general';


// // const ApplicationForm = () => {
// //   const { token } = useAuthContext();
// //   const [formData, setFormData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     phoneNumber: '',
// //     institution: '',
// //     department: '',
// //     level: '',
// //     matricNumber: '',
// //     address: '',
// //     lgaOfOrigin: '',
// //     stateOfResidence: '',
// //   });

// //   const [application, setApplication] = useState(null); // Store application details after submission

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const response = await axios.post('/apply', formData, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       alert('Application submitted successfully!');
// // //       setApplication(response.data);
// // //     } catch (error) {
// // //       console.error(error.response.data);
// // //       alert('Error submitting application!');
// // //     }
// // //   };

// // console.log("token", token)
// // const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //         const response = await ApplyUser(formData, token);
// //       alert('Application submitted successfully!');
// //       setApplication(response.data); 
// //     } catch (error) {
// //       console.error(error.response?.data || error.message);
// //       alert('Error submitting application!');
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
// //       <h1 className="text-2xl font-bold mb-4">Apply for ID</h1>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {Object.keys(formData).map((field) => (
// //           <div key={field}>
// //             <label className="block text-sm font-medium capitalize">{field}</label>
// //             <input
// //               type="text"
// //               name={field}
// //               value={formData[field]}
// //               onChange={handleChange}
// //               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>
// //         ))}
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
// //         >
// //           Submit
// //         </button>
// //       </form>

// //       {application && (
// //         <div className="mt-6">
// //           <h2 className="text-xl font-bold mb-2">Proceed to Payment</h2>
// //           <PaystackButton
// //             amount={5000}
// //             orderId={application._id}
// //             onSuccess={(data) => {
// //               alert('Payment successful!');
// //               console.log(data);
// //             }}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ApplicationForm;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../../context/AuthContext';
// import PaystackButton from '../../Components/PaystackButton';
// import { ApplyUser } from '../../api/general';

// const ApplicationForm = () => {
//     const { token } = useAuthContext();
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         institution: '',
//         department: '',
//         level: '',
//         matricNumber: '',
//         address: '',
//         lgaOfOrigin: '',
//         stateOfResidence: '',
//     });

//     const [application, setApplication] = useState(null);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await ApplyUser(formData, token);
//             alert('Application submitted successfully!');
//             setApplication(response.data);
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 phoneNumber: '',
//                 institution: '',
//                 department: '',
//                 level: '',
//                 matricNumber: '',
//                 address: '',
//                 lgaOfOrigin: '',
//                 stateOfResidence: '',
//             });
//         } catch (error) {
//             console.error(error.response?.data || error.message);
//             alert('Error submitting application!');
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//             <h1 className="text-3xl font-bold mb-4 text-green-600">Apply for ID</h1>
//             {!application ? (
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {Object.keys(formData).map((field) => (
//                         <div key={field}>
//                             <label className="block text-sm font-semibold capitalize text-gray-700">
//                                 {field.replace(/([A-Z])/g, ' $1')}
//                             </label>
//                             <input
//                                 type="text"
//                                 name={field}
//                                 value={formData[field]}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     ))}
//                     <button
//                         type="submit"
//                         className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all"
//                     >
//                         Submit
//                     </button>
//                 </form>
//             ) : (
//                 <div className="mt-6">
//                     <h2 className="text-xl font-bold text-green-500">Application Details</h2>
//                     <ul className="text-gray-700 space-y-2">
//                         {Object.entries(application).map(([key, value]) => (
//                             <li key={key}>
//                                 <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
//                                 {value}
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-4 flex justify-end space-x-4">
//                         <button
//                             className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//                             onClick={() => {
//                                 alert('You can pay later.');
//                                 window.location.href = "/my-order"; // Navigate to the 'my-order' page
//                             }}
//                         >
//                             Pay Later
//                         </button>
//                         <PaystackButton
//                             amount={5000}
//                             orderId={application._id}
//                             onSuccess={(data) => {
//                                 alert('Payment successful!');
//                                 console.log("data from paystack", data);
//                             }}
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ApplicationForm;
import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import PaystackButton from '../../Components/PaystackButton';
import { ApplyUser } from '../../api/general';

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

    const [application, setApplication] = useState(null);
    console.log("aplication here ",application)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApplyUser(formData, token);
            alert('Application submitted successfully!');
            console.log("response data for aplication",response)
            setApplication(response.data.data.application);
            setFormData({
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
        } catch (error) {
            // console.error(error.response?.message || error.message);
            alert('Error submitting application!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-green-600">Apply for ID</h1>
            {!application ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.keys(formData).map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-semibold capitalize text-gray-700">
                                {field.replace(/([A-Z])/g, ' $1')}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all"
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-green-500">Application Details</h2>
                    <div className="text-gray-700 space-y-4">
                        <div>
                            <span className="font-semibold">First Name: </span>{application.firstName}
                        </div>
                        <div>
                            <span className="font-semibold">Last Name: </span>{application.lastName}
                        </div>
                        <div>
                            <span className="font-semibold">Email: </span>{application.email}
                        </div>
                        <div>
                            <span className="font-semibold">Phone Number: </span>{application.phoneNumber}
                        </div>
                        <div>
                            <span className="font-semibold">Institution: </span>{application.institution}
                        </div>
                        <div>
                            <span className="font-semibold">Department: </span>{application.department}
                        </div>
                        <div>
                            <span className="font-semibold">Level: </span>{application.level}
                        </div>
                        <div>
                            <span className="font-semibold">Matric Number: </span>{application.matricNumber}
                        </div>
                        <div>
                            <span className="font-semibold">Address: </span>{application.address}
                        </div>
                        <div>
                            <span className="font-semibold">LGA of Origin: </span>{application.lgaOfOrigin}
                        </div>
                        <div>
                            <span className="font-semibold">State of Residence: </span>{application.stateOfResidence}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            onClick={() => {
                                alert('You can pay later.');
                                window.location.href = "/my-order";
                            }}
                        >
                            Pay Later
                        </button>
                        <PaystackButton
                            amount={5000}
                            orderId={application._id}
                            onSuccess={(data) => {
                                alert('Payment successful!');
                                console.log("data from paystack", data);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationForm;


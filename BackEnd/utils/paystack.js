
// const axios = require('axios');

// exports.verifyPaystackPayment = async (reference) => {
//   const PAYSTACK_SECRET_KEY = 'pk_test_8ba0442163c9e7f0e0817c6dd94622a9829b35f2';
//   try {
//     const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
//       headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
//     });
//     return response.data.status === 'success';
//   } catch (error) {
//     return false;
//   }
// };


const axios = require('axios');

exports.verifyPayment = async (req, res) => {
  const PAYSTACK_SECRET_KEY = 'sk_test_8ba0442163c9e7f0e0817c6dd94622a9829b35f2'; // Use secret key
  const { reference, applicationId } = req.body;

  if (!reference) return res.status(400).json({ error: 'Payment reference is required.' });

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    });

    if (response.data.data.status === 'success') {
      // Payment is successful
      console.log('Payment Verified:', response.data);

      // Optionally, store payment in DB using applicationId
      // await savePayment(applicationId, reference);

      return res.status(200).json({ success: true, data: response.data });
    } else {
      return res.status(400).json({ error: 'Payment verification failed.' });
    }
  } catch (error) {
    console.error('Error Verifying Payment:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Server error. Failed to verify payment.' });
  }
};



const axios = require('axios');

exports.verifyPaystackPayment = async (reference) => {
  const PAYSTACK_SECRET_KEY = 'pk_test_8ba0442163c9e7f0e0817c6dd94622a9829b35f2';
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    });
    return response.data.status === 'success';
  } catch (error) {
    return false;
  }
};

const QRCode = require('qrcode');

const generateQRCode = async (req, res) => {
  try {
    const { idNumber, firstName, lastName, institution } = req.body;

    // Create data object to encode in QR
    const qrData = JSON.stringify({
      idNumber,
      name: `${firstName} ${lastName}`,
      institution,
      verificationUrl: `https://nulass.org/verify/${idNumber}` // Replace with your actual verification URL
    });

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    res.json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    console.error('QR Code Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

module.exports = {
  generateQRCode
}; 
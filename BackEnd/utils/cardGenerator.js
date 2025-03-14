const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const path = require('path');

const generateMembershipCard = async (application) => {
  const doc = new PDFDocument({
    size: [600, 400],
    layout: 'landscape'
  });

  // Generate QR code
  const qrCodeData = await QRCode.toDataURL(JSON.stringify({
    memberId: application._id,
    name: `${application.firstName} ${application.lastName}`,
    institution: application.institution
  }));

  // Add background color
  doc.rect(0, 0, doc.page.width, doc.page.height)
     .fill('#f8fafc');

  // Add header
  doc.fontSize(24)
     .font('Helvetica-Bold')
     .fillColor('#1e40af')
     .text('NULASS MEMBERSHIP CARD', 50, 40, { align: 'center' });

  // Add member photo if exists
  if (application.image) {
    doc.image(
      path.join(__dirname, '../uploads', application.image),
      50, 100,
      { width: 120, height: 120 }
    );
  }

  // Add member details
  doc.fontSize(12)
     .font('Helvetica')
     .fillColor('#1f2937')
     .text(`Member ID: ${application.applicationNumber}`, 200, 100)
     .text(`Name: ${application.firstName} ${application.lastName}`, 200, 120)
     .text(`Institution: ${application.institution}`, 200, 140)
     .text(`Department: ${application.department}`, 200, 160)
     .text(`Level: ${application.level}`, 200, 180);

  // Add QR Code
  doc.image(qrCodeData, 450, 100, { width: 100 });

  // Add footer
  doc.fontSize(10)
     .fillColor('#6b7280')
     .text('This card is valid for the current academic session', 50, 320, { align: 'center' })
     .text('Powered by NULASS', 50, 340, { align: 'center' });

  return doc;
};

module.exports = { generateMembershipCard }; 
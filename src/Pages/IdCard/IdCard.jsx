import React, { useState, useEffect } from "react";
import Logo from "../../assets/Images/Logo.png";
import Modal from "react-modal";
import { FaIdCard, FaTimes } from "react-icons/fa";
import html2canvas from "html2canvas";
import { generateQRCode, getUserIdCard } from "../../api/general";
import { useAuthContext } from "../../context/AuthContext";

function IdCard({ application }) {
  const [idNumber, setIdNumber] = useState("");
  const [generatedId, setGeneratedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleInputChange = (e) => {
    setIdNumber(e.target.value);
  };

  const generateQRCodeData = async () => {
    try {
      setLoading(true);
      const qrData = {
        idNumber: generatedId,
        firstName: application?.firstName || 'John',
        lastName: application?.lastName || 'Doe',
        institution: application?.institution || 'Not Specified'
      };

      const response = await generateQRCode(qrData, user.token);
      setQrCode(response.qrCode);
      setError(null);
    } catch (err) {
      console.error('QR Code Generation Error:', err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateIdCard = async () => {
    if (idNumber.trim() !== "") {
      try {
        setGeneratedId(idNumber);
        await generateQRCodeData();
        setIsModalOpen(true);
      } catch (err) {
        setError('Failed to generate ID card. Please try again.');
      }
    }
  };

  const downloadIdCard = () => {
    const idCard = document.querySelector('.id-card-content');
    
    if (!idCard) {
      setError('Unable to download ID card. Please try again.');
      return;
    }

    try {
      html2canvas(idCard).then(canvas => {
        const link = document.createElement('a');
        link.download = `NULASS_ID_${generatedId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    } catch (err) {
      setError('Failed to download ID card. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          NULASS Digital ID Card
        </h1>
        <p className="text-gray-600 text-lg">
          Generate your official NULASS identification card
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <FaIdCard className="text-6xl text-customGreen" />
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Enter Your ID Number
            </label>
            <input
              type="text"
              value={idNumber}
              onChange={handleInputChange}
              placeholder="e.g., NULASS/2024/001"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            onClick={generateIdCard}
            className="w-full bg-customGreen hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all transform hover:scale-[1.02]"
          >
            Generate ID Card
          </button>
        </div>
      </div>

      {/* ID Card Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="max-w-lg mx-auto mt-20 bg-transparent border-0 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>

          {/* ID Card Content */}
          <div className="id-card-content p-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-6 mb-6">
              <div className="flex items-center gap-4">
                <img src={Logo} alt="NULASS Logo" className="w-16 h-16" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">NULASS</h2>
                  <p className="text-gray-500">National Union of Lagos State Students</p>
                </div>
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex gap-6 mb-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden shadow-md">
                <img
                  src={application?.image ? `http://localhost:5000/${application.image}` : Logo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {`${application?.firstName || 'John'} ${application?.lastName || 'Doe'}`}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">ID Number:</span> {generatedId}</p>
                  <p><span className="font-medium">Institution:</span> {application?.institution || 'Not Specified'}</p>
                  <p><span className="font-medium">Matric Number:</span> {application?.matricNumber || 'Not Specified'}</p>
                  <p><span className="font-medium">Level:</span> {application?.level || 'Not Specified'}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <p>Valid Until: December 2024</p>
                  <p>Issue Date: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="w-24">
                  {loading ? (
                    <div className="flex items-center justify-center h-24">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-customGreen"></div>
                    </div>
                  ) : error ? (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                  ) : qrCode ? (
                    <img src={qrCode} alt="QR Code" className="w-full" />
                  ) : (
                    <div className="text-center text-gray-500">No QR Code</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-4 flex gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={downloadIdCard}
              disabled={loading || error}
              className={`flex-1 px-6 py-2 rounded-lg transition-colors ${
                loading || error 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-customGreen hover:bg-green-600 text-white'
              }`}
            >
              {loading ? 'Processing...' : 'Download'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default IdCard;

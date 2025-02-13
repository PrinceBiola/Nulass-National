import React, { useState } from "react";
import Logo from "../../assets/Images/Logo.png";
import Modal from "react-modal";

function IdCard({ application }) {
  const [idNumber, setIdNumber] = useState("");
  const [generatedId, setGeneratedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setIdNumber(e.target.value);
  };

  const generateIdCard = () => {
    if (idNumber.trim() !== "") {
      setGeneratedId(idNumber);
      setIsModalOpen(true); // Open modal when ID is generated
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        NULASS ID Card Generator
      </h1>

      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <input
          type="number"
          value={idNumber}
          onChange={handleInputChange}
          placeholder="Enter your ID number"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <button
          onClick={generateIdCard}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Generate ID Card
        </button>
      </div>

      {/* ID Card Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-2xl overflow-hidden"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center border-b pb-4 mb-4">
            <img src={Logo} alt="Logo" className="w-14 h-14" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-700">NULASS National ID Card</h2>
              <p className="text-sm text-gray-500">Empowering Students Nationwide</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-4">
              <img
                src={application?.image ? `http://localhost:5000/${application.image}` : Logo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-semibold text-gray-700">{`${application?.firstName} ${application?.lastName}`}</p>
            <p className="text-gray-500 text-sm font-medium mb-4">
              ID: {generatedId}
            </p>
            <p className="text-gray-500 text-sm font-medium">
              Institution: {application?.institution}
            </p>
            <p className="text-gray-500 text-sm font-medium">
              Matric Number: {application?.matricNumber}
            </p>
          </div>

          {/* Close Button */}
          <button
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md font-semibold transition"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default IdCard;

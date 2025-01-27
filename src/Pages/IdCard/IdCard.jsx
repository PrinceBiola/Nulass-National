import React, { useState } from "react";
import Logo from "../../assets/Images/Logo.png";

function IdCard() {
  const [idNumber, setIdNumber] = useState("");
  const [generatedId, setGeneratedId] = useState(null);

  const handleInputChange = (e) => {
    setIdNumber(e.target.value);
  };

  const generateIdCard = () => {
    if (idNumber.trim() !== "") {
      setGeneratedId(idNumber);
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

      {/* ID Card Preview */}
      {generatedId && (
        <div className="mt-8 bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
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
                src={Logo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-semibold text-gray-700">John Doe</p>
            <p className="text-gray-500 text-sm font-medium mb-4">
              ID: {generatedId}
            </p>
            <p className="text-gray-500 text-sm font-medium">
              Institution: Tai Solarin University of Education
            </p>
            <p className="text-gray-500 text-sm font-medium">
              Matric Number: 20200204070
            </p>
          </div>

          {/* Download Button */}
          <button
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md font-semibold transition"
            onClick={() => alert("Download functionality coming soon!")}
          >
            Download ID Card
          </button>
        </div>
      )}
    </div>
  );
}

export default IdCard;

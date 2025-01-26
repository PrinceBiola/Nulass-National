import React from "react";
import { useState } from "react";
import Logo from "../../assets/Images/Logo.png";

function IdCard() {
  const [idNumber, setIdNumber] = useState("");
  const [generatedId, setGeneratedId] = useState(null);

  const handleInputChange = (e) => {
    setIdNumber(e.target.value);
  };

  const generateIdCard = () => {
    if (idNumber !== "") {
      setGeneratedId(idNumber);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">ID Card Generator</h1>

      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={idNumber}
          onChange={handleInputChange}
          placeholder="Enter ID number"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-transparent transition w-80"
        />
        <button
          onClick={generateIdCard}
          className="px-6 py-2 bg-customGreen text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
        >
          Generate ID Card
        </button>
      </div>

      {generatedId && (
        <div className="mt-8 p-6 w-96 bg-white rounded-2xl shadow-xl border border-gray-200">
          <div className="flex items-center mb-6">
            <img src={Logo} alt="" className="w-12" />
            <div className="ml-4">
              <h1 className="text-lg font-bold text-gray-700">
                NULASS National ID Card
              </h1>
              <p className="text-sm text-gray-500">
                Empowering Students Nationwide
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src={Logo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-gray-700 font-medium text-lg">John Doe</p>
            <p className="text-gray-500 text-sm font-semibold">
              ID: {generatedId}
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Institution: Tai Solarin University of Education
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Matric Number: 20200204070
            </p>
          </div>
          <button>
            Download
          </button>
        </div>
      )}
    </div>
  );
}

export default IdCard;

import React from "react";
import Modal from "react-modal";

const ViewApplicationModal = ({ isOpen, onClose, application }) => {
  if (!application) return null;

  console.log(application); // Check if the application data is correct

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-2xl overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
    >
      <div className="max-h-[80vh] overflow-y-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Application Details</h2>
        <div className="space-y-4 divide-y divide-gray-300">
          {[
            ["Name", `${application.firstName} ${application.lastName}`],
            ["Email", application.email],
            ["Phone Number", application.phoneNumber],
            ["NIN", application.NIN],
            ["Institution", application.institution],
            ["Department", application.department],
            ["Level", application.level],
            ["Matric Number", application.matricNumber],
            ["Address", application.address],
            ["LGA of Origin", application.lgaOfOrigin],
            ["State of Residence", application.stateOfResidence],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2">
              <span className="font-semibold text-gray-700">{label}:</span>
              <span className="text-gray-900">{value}</span>
            </div>
          ))}

          <div className="flex justify-between py-2">
            <span className="font-semibold text-gray-700">Image:</span>
            <span>
              {application.image ? (
                <img src={application.image} alt="Uploaded" className="w-24 h-24 object-cover rounded-lg shadow-md" />
              ) : (
                "No image uploaded"
              )}
            </span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="font-semibold text-gray-700">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-md ${
              application.status === 'approved' ? 'bg-green-200 text-green-800' :
              application.status === 'rejected' ? 'bg-red-200 text-red-800' :
              'bg-yellow-200 text-yellow-800'
            }`}>
              {application.status}
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-semibold text-gray-700">Payment Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-md ${
              application.paymentStatus === 'paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            }`}>
              {application.paymentStatus}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewApplicationModal;
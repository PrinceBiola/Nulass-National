import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { getAllApplications, updateApplicationStatus } from '../../api/admin';
import RejectionModal from './RejectionModal';
import ViewApplicationModal from './ViewApplicationModal';
import { toast } from 'react-toastify';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getAllApplications(user.token);
      setApplications(data);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus, rejectionReason = '') => {
    try {
      await updateApplicationStatus(applicationId, {
        status: newStatus,
        rejectionReason: rejectionReason
      }, user.token);
      
      // Refresh applications list
      fetchApplications();
      
      // Show success message
      toast.success(`Application ${newStatus} successfully`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update application status');
    }
  };

  const handleView = (application) => {
    setSelectedApp(application);
    setShowViewModal(true);
  };

  const handleReject = (application) => {
    setSelectedApp(application);
    setShowRejectionModal(true);
  };

  if (loading) return <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customGreen"></div>
  </div>;

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Application Management</h1>
      </div>

      <div className="grid gap-6">
        {applications.map((application) => (
          <div key={application._id} 
               className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  {application.firstName} {application.lastName}
                </h3>
                <p className="text-gray-600">{application.email}</p>
                <p className="text-gray-600">{application.institution}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium
                ${application.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                  application.status === 'approved' ? 'bg-green-100 text-green-800' :
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'}`}>
                {application.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><span className="font-medium">Department:</span> {application.department}</p>
                <p><span className="font-medium">Level:</span> {application.level}</p>
                <p><span className="font-medium">Matric Number:</span> {application.matricNumber}</p>
              </div>
              <div>
                <p><span className="font-medium">Phone:</span> {application.phoneNumber}</p>
                <p><span className="font-medium">State:</span> {application.stateOfResidence}</p>
                <p><span className="font-medium">LGA:</span> {application.lgaOfOrigin}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleView(application)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>

              {application.status === 'under_review' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(application._id, 'approved')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(application)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>

            {application.status === 'rejected' && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  <span className="font-medium">Rejection Reason:</span> {application.rejectionReason}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
      <ViewApplicationModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        application={selectedApp}
      />
      
      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        applicationId={selectedApp?._id}
        onReject={(id, reason) => handleStatusUpdate(id, 'rejected', reason)}
      />
    </div>
  );
};

export default ApplicationManagement; 
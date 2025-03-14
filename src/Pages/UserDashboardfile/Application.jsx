import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { getUserApplicationHistory } from '../../api/general';
import ApplicationForm from '../../Components/Forms/ApplicationForm';
import PaymentModal from '../../Components/PaymentModal';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaHourglassHalf, FaCreditCard, FaIdCard, FaTimes } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    fetchApplications();
  }, [user.token]);

  const fetchApplications = async () => {
    try {
      const data = await getUserApplicationHistory(user.token);
      setApplications(data);
      } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = (applicationId) => {
    const application = applications.find(app => app._id === applicationId);
    if (application) {
      setSelectedApplication(application);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = async () => {
    await fetchApplications();
    setShowPaymentModal(false);
    setSelectedApplication(null);
    toast.success('Payment processed successfully!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customGreen"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Show application history if exists */}
      {applications.length > 0 && (
          <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Application History</h2>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Application #{app.applicationNumber}</p>
                    <h3 className="text-lg font-semibold mt-1">{app.firstName} {app.lastName}</h3>
                    <p className="text-sm text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${app.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        app.status === 'payment_pending' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {app.status.replace('_', ' ').toUpperCase()}
                    </span>
              </div>
                </div>

                {app.rejectionReason && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-700 text-sm">
                      <span className="font-medium">Rejection Reason:</span> {app.rejectionReason}
                    </p>
              </div>
                )}

                {app.status === 'payment_pending' && (
                  <div className="mt-4">
                    <button
                      onClick={() => handlePayment(app._id)}
                      className="w-full bg-customGreen text-white py-2 rounded-lg hover:bg-opacity-90"
                    >
                      Proceed to Payment
                    </button>
              </div>
                )}
              </div>
            ))}
          </div>
                          </div>
                        )}

      {/* Show application form if no active application or last one was rejected */}
      {(!applications.length || applications[0]?.status === 'rejected') && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Submit Application</h2>
          <ApplicationForm onSuccess={fetchApplications} />
                  </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedApplication && (
                <PaymentModal
                  isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedApplication(null);
          }}
          applicationData={selectedApplication}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              )}
    </div>
  );
};

export default Application;

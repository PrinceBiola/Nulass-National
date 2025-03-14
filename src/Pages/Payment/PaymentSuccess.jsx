import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { getPaymentStatus, getUserApplication } from '../../api/payment';
import { FaCheckCircle, FaDownload, FaShare } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const { token } = useAuthContext();
  const location = useLocation();
  const reference = new URLSearchParams(location.search).get('reference');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await getPaymentStatus(reference, token);
        const appData = await getUserApplication(token);
        setApplication(appData);
      } catch (error) {
        console.error('Verification error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      verifyPayment();
    }
  }, [reference, token]);

  const handleDownloadCard = async () => {
    try {
      const response = await downloadMembershipCard(application._id, token);
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `membership-card-${application.applicationNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Error downloading membership card');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NULASS Membership',
          text: `I'm now a member of NULASS! Member ID: ${application.applicationNumber}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-green-500 p-6 text-center">
            <FaCheckCircle className="mx-auto h-16 w-16 text-white" />
            <h2 className="mt-4 text-3xl font-bold text-white">Payment Successful!</h2>
            <p className="mt-2 text-white">Your membership application has been approved</p>
          </div>

          {/* Member Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Member Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                      <dd className="text-sm text-gray-900">{`${application?.firstName} ${application?.lastName}`}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Member ID</dt>
                      <dd className="text-sm text-gray-900">{application?.applicationNumber}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Institution</dt>
                      <dd className="text-sm text-gray-900">{application?.institution}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Department</dt>
                      <dd className="text-sm text-gray-900">{application?.department}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Reference</dt>
                      <dd className="text-sm text-gray-900">{reference}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Amount Paid</dt>
                      <dd className="text-sm text-gray-900">₦5,000</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="text-sm text-green-600">Completed</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleDownloadCard}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <FaDownload className="mr-2" />
                  Download Membership Card
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <FaShare className="mr-2" />
                  Share Certificate
                </button>
              </div>
              <Link
                to="/dashboard"
                className="block text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { getUserApplicationHistory } from '../../api/general';

const UserOrder = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customGreen"></div>
    </div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>
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
                <p className="mt-2 text-sm">
                  Payment Status: <span className={app.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}>
                    {app.paymentStatus.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            {app.rejectionReason && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-red-700 text-sm">
                  <span className="font-medium">Rejection Reason:</span> {app.rejectionReason}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrder; 
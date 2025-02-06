import React, { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus, exportApplications } from '../../api/admin';
import RejectionModal from './RejectionModal';
import ViewApplicationModal from './ViewApplicationModal';
import { toast } from 'react-toastify';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    paymentStatus: 'all'
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      toast.error('Error fetching applications');
    }
  };

  const handleApprove = async (id) => {
    try {
      await updateApplicationStatus(id, 'approved');
      toast.success('Application approved successfully');
      fetchApplications();
    } catch (error) {
      toast.error('Error approving application');
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportApplications();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'applications.xlsx';
      a.click();
    } catch (error) {
      toast.error('Error exporting applications');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Application Management</h1>
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Export to Excel
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={filters.paymentStatus}
          onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Payments</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Institution</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Payment</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{`${app.firstName} ${app.lastName}`}</td>
                <td className="px-6 py-4">{app.email}</td>
                <td className="px-6 py-4">{app.institution}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    app.status === 'approved' ? 'bg-green-100 text-green-800' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    app.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {app.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowViewModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </button>
                    {app.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(app._id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setShowRejectionModal(true);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        application={selectedApp}
        onReject={fetchApplications}
      />
      
      <ViewApplicationModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        application={selectedApp}
      />
    </div>
  );
};

export default ApplicationManagement; 
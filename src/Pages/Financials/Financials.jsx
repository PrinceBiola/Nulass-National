import React, { useState } from 'react';

function Financials() {
  const [reports, setReports] = useState([]); // Replace with actual data fetching
  const [newReport, setNewReport] = useState({ title: '', amount: '', type: '', date: '' });
  const [scholarshipApplications, setScholarshipApplications] = useState([]); // Replace with actual data fetching

  // Example functions to handle financial report actions
  const addReport = () => {
    // Logic to add a new financial report
    setReports([...reports, newReport]);
    setNewReport({ title: '', amount: '', type: '', date: '' }); // Reset form
  };

  const deleteReport = (index) => {
    // Logic to delete a financial report
    setReports(reports.filter((_, i) => i !== index));
  };

  const approveApplication = (id) => {
    // Logic to approve scholarship application
  };

  const rejectApplication = (id) => {
    // Logic to reject scholarship application
  };

  return (
    <div className="space-y-6">
      {/* Financial Reports Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Financial Reports</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Report Title"
            className="border rounded-lg p-2 w-full mb-2"
            value={newReport.title}
            onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border rounded-lg p-2 w-full mb-2"
            value={newReport.amount}
            onChange={(e) => setNewReport({ ...newReport, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Type (e.g., Donation, Expense)"
            className="border rounded-lg p-2 w-full mb-2"
            value={newReport.type}
            onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
          />
          <input
            type="date"
            className="border rounded-lg p-2 w-full mb-2"
            value={newReport.date}
            onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
          />
          <button onClick={addReport} className="bg-blue-600 text-white rounded-lg p-2">Add Report</button>
        </div>
        <h3 className="text-lg font-semibold mb-2">Existing Reports</h3>
        <ul className="space-y-2">
          {reports.map((report, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="font-bold">{report.title}</h4>
                <p>Amount: ${report.amount} | Type: {report.type} | Date: {report.date}</p>
              </div>
              <button onClick={() => deleteReport(index)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Scholarship Applications Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Scholarship Applications</h2>
        <ul className="space-y-2">
          {scholarshipApplications.map((application) => (
            <li key={application.id} className="flex justify-between items-center">
              <span>{application.name} - {application.status}</span>
              <div>
                <button onClick={() => approveApplication(application.id)} className="text-green-600">Approve</button>
                <button onClick={() => rejectApplication(application.id)} className="text-red-600 ml-4">Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Financials;

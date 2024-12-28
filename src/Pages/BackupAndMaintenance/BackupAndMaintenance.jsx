import React, { useState } from 'react';

function BackupAndMaintenance() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  // Example function to handle backup data
  const handleBackup = (type) => {
    // Logic to download or schedule backup
    console.log(`Backing up ${type}...`);
    // Here you would implement the actual backup logic, e.g., API calls
  };

  return (
    <div className="space-y-6">
      {/* Backup Data Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Backup Data</h2>
        <p className="mb-2">Select the type of data to back up:</p>
        <button onClick={() => handleBackup('Member Lists')} className="bg-blue-600 text-white rounded-lg p-2 mr-2">Backup Member Lists</button>
        <button onClick={() => handleBackup('Blogs')} className="bg-blue-600 text-white rounded-lg p-2 mr-2">Backup Blogs</button>
        <button onClick={() => handleBackup('Financial Data')} className="bg-blue-600 text-white rounded-lg p-2">Backup Financial Data</button>
      </div>

      {/* Maintenance Mode Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Maintenance Mode</h2>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isMaintenanceMode}
            onChange={() => setIsMaintenanceMode(!isMaintenanceMode)}
            className="mr-2"
          />
          <label>{isMaintenanceMode ? 'Deactivate Maintenance Mode' : 'Activate Maintenance Mode'}</label>
        </div>
        <p className="mt-2 text-gray-500">
          {isMaintenanceMode ? 'The website is currently in maintenance mode.' : 'The website is live and accessible to users.'}
        </p>
      </div>
    </div>
  );
}

export default BackupAndMaintenance; 
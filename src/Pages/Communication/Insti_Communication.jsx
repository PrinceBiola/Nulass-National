import React, { useState } from "react";

function Insti_Communication() {
  const [notification, setNotification] = useState  ({
    message: "",
    targetGroup: "all", // Options: 'all', 'specific'
    contactMethod: "email", // Options: 'email', 'sms'
  });

  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");

  // Example function to send notifications
  const sendNotification = () => {
    // Logic to send notification
    console.log(
      `Sending ${notification.contactMethod} notification to ${notification.targetGroup}: ${notification.message}`
    );
    setNotification({
      message: "",
      targetGroup: "all",
      contactMethod: "email",
    }); // Reset form
  };

  // Example function to add feedback
  const addFeedback = () => {
    if (newFeedback) {
      setFeedback([...feedback, newFeedback]);
      setNewFeedback(""); // Reset input
    }
  };
  return (
    <div className="space-y-6">
      {/* Send Notifications Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Send Notifications</h2>
        <textarea
          placeholder="Enter your message here..."
          className="border rounded-lg p-2 w-full mb-2"
          value={notification.message}
          onChange={(e) =>
            setNotification({ ...notification, message: e.target.value })
          }
        />
        <div className="mb-4">
          <label className="mr-2">Target Group:</label>
          <select
            value={notification.targetGroup}
            onChange={(e) =>
              setNotification({ ...notification, targetGroup: e.target.value })
            }
            className="border rounded-lg p-2"
          >
            <option value="all">All Members</option>
            <option value="specific">Specific Group</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="mr-2">Contact Method:</label>
          <select
            value={notification.contactMethod}
            onChange={(e) =>
              setNotification({
                ...notification,
                contactMethod: e.target.value,
              })
            }
            className="border rounded-lg p-2"
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>
        <button
          onClick={sendNotification}
          className="bg-blue-600 text-white rounded-lg p-2"
        >
          Send Notification
        </button>
      </div>

      {/* Feedback & Support Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Feedback & Support</h2>
        <textarea
          placeholder="Enter your feedback or inquiry..."
          className="border rounded-lg p-2 w-full mb-2"
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
        />
        <button
          onClick={addFeedback}
          className="bg-blue-600 text-white rounded-lg p-2"
        >
          Submit Feedback
        </button>
        <h3 className="text-md font-semibold mt-4">Submitted Feedback</h3>
        <ul className="list-disc pl-5">
          {feedback.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Insti_Communication;

import React, { useState } from "react";

function Insti_Analytics() {
  const [trafficData, setTrafficData] = useState({
    pageViews: 0,
    bounceRate: 0,
    demographics: [],
  });

  const [memberEngagement, setMemberEngagement] = useState({
    totalLogins: 0,
    interactions: [],
  });

  const [eventMetrics, setEventMetrics] = useState({
    totalAttendees: 0,
    feedbackRatings: [],
  });

  // Example functions to simulate data fetching
  const fetchTrafficData = () => {
    // Simulate fetching traffic data
    setTrafficData({
      pageViews: 1200,
      bounceRate: 35,
      demographics: [
        { ageGroup: "18-24", percentage: 40 },
        { ageGroup: "25-34", percentage: 30 },
        { ageGroup: "35-44", percentage: 20 },
        { ageGroup: "45+", percentage: 10 },
      ],
    });
  };

  const fetchMemberEngagement = () => {
    // Simulate fetching member engagement data
    setMemberEngagement({
      totalLogins: 300,
      interactions: [
        { member: "John Doe", actions: 5 },
        { member: "Jane Smith", actions: 3 },
      ],
    });
  };

  const fetchEventMetrics = () => {
    // Simulate fetching event metrics
    setEventMetrics({
      totalAttendees: 150,
      feedbackRatings: [
        { event: "Leadership Summit", rating: 4.5 },
        { event: "Annual Conference", rating: 4.8 },
      ],
    });
  };
  return (
    <div className="space-y-6">
      {/* Website Traffic Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Website Traffic</h2>
        <button
          onClick={fetchTrafficData}
          className="bg-blue-600 text-white rounded-lg p-2 mb-4"
        >
          Fetch Traffic Data
        </button>
        <p>Total Page Views: {trafficData.pageViews}</p>
        <p>Bounce Rate: {trafficData.bounceRate}%</p>
        <h3 className="text-md font-semibold mt-4">User Demographics</h3>
        <ul className="list-disc pl-5">
          {trafficData.demographics.map((demo, index) => (
            <li key={index}>
              {demo.ageGroup}: {demo.percentage}%
            </li>
          ))}
        </ul>
      </div>

      {/* Member Engagement Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Member Engagement</h2>
        <button
          onClick={fetchMemberEngagement}
          className="bg-blue-600 text-white rounded-lg p-2 mb-4"
        >
          Fetch Engagement Data
        </button>
        <p>Total Logins: {memberEngagement.totalLogins}</p>
        <h3 className="text-md font-semibold mt-4">Recent Interactions</h3>
        <ul className="list-disc pl-5">
          {memberEngagement.interactions.map((interaction, index) => (
            <li key={index}>
              {interaction.member}: {interaction.actions} actions
            </li>
          ))}
        </ul>
      </div>

      {/* Event Metrics Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Event Metrics</h2>
        <button
          onClick={fetchEventMetrics}
          className="bg-blue-600 text-white rounded-lg p-2 mb-4"
        >
          Fetch Event Metrics
        </button>
        <p>Total Attendees: {eventMetrics.totalAttendees}</p>
        <h3 className="text-md font-semibold mt-4">Feedback Ratings</h3>
        <ul className="list-disc pl-5">
          {eventMetrics.feedbackRatings.map((feedback, index) => (
            <li key={index}>
              {feedback.event}: {feedback.rating} stars
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Insti_Analytics;

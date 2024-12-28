import React, { useState } from 'react';

function Events() {
  const [events, setEvents] = useState([]); // Replace with actual data fetching
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    banner: '',
  });

  const [attendees, setAttendees] = useState([]); // Replace with actual data fetching

  // Example functions to handle event actions
  const createEvent = () => {
    // Logic to create a new event
    setEvents([...events, newEvent]);
    setNewEvent({ title: '', date: '', time: '', location: '', description: '', banner: '' }); // Reset form
  };

  const deleteEvent = (index) => {
    // Logic to delete an event
    setEvents(events.filter((_, i) => i !== index));
  };

  const approveRegistration = (id) => {
    // Logic to approve registration
  };

  const declineRegistration = (id) => {
    // Logic to decline registration
  };

  return (
    <div className="space-y-6">
      {/* Create New Event Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Create New Event</h2>
        <input
          type="text"
          placeholder="Event Title"
          className="border rounded-lg p-2 w-full mb-2"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="date"
          className="border rounded-lg p-2 w-full mb-2"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="time"
          className="border rounded-lg p-2 w-full mb-2"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="border rounded-lg p-2 w-full mb-2"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border rounded-lg p-2 w-full mb-2"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Banner URL"
          className="border rounded-lg p-2 w-full mb-2"
          value={newEvent.banner}
          onChange={(e) => setNewEvent({ ...newEvent, banner: e.target.value })}
        />
        <button onClick={createEvent} className="bg-blue-600 text-white rounded-lg p-2">Create Event</button>
      </div>

      {/* View Upcoming Events Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="font-bold">{event.title}</h4>
                <p>{event.date} at {event.time}</p>
                <p>{event.location}</p>
                <p>{event.description}</p>
                {event.banner && <img src={event.banner} alt="Event Banner" className="w-32 h-32 object-cover mt-2" />}
              </div>
              <div>
                <button onClick={() => deleteEvent(index)} className="text-red-600">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Event Registration Management Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Event Registration Management</h2>
        <ul className="space-y-2">
          {attendees.map((attendee) => (
            <li key={attendee.id} className="flex justify-between items-center">
              <span>{attendee.name}</span>
              <div>
                <button onClick={() => approveRegistration(attendee.id)} className="text-green-600">Approve</button>
                <button onClick={() => declineRegistration(attendee.id)} className="text-red-600 ml-4">Decline</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Events;

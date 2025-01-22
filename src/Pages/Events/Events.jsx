import React, { useState, useEffect } from 'react';
import { fetchEvents, createEvent, deleteEvent } from '../../api/event';
import { formatDate } from '../../Helper/helper';

function Events() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    author: "",
  });
  
  const [showForm, setShowForm] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState(null);

  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    loadEvents();
  }, []);

  const createNewEvent = async () => {
    try {
      const createdEvent = await createEvent(newEvent);
      setEvents([...events, createdEvent]);
      setNewEvent({ title: '', date: '', time: '', location: '', description: '', image: '', author: "" });
      setShowForm(false);  // Hide form after creating event
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const deleteEventById = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const toggleDescription = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId); 
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      
 
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Event</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
        >
          {showForm ? 'Cancel' : 'Create New Event'}
        </button>
        {showForm && (
          <div className="grid grid-cols-2 gap-6 mt-6">
            <input
              type="text"
              placeholder="Event Title"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <input
              type="time"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newEvent.author}
              onChange={(e) => setNewEvent({ ...newEvent, author: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 col-span-2 focus:outline-none"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Banner URL"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 col-span-2 focus:outline-none"
              value={newEvent.image}
              onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
            />
          </div>
        )}
        {showForm && (
          <button
            onClick={createNewEvent}
            className="mt-6 bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
          >
            Create Event
          </button>
        )}
      </div>


      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Events</h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-xl transition duration-300 ease-in-out transform">
              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600">{formatDate(event.date)} at {event.time}</p>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-sm text-gray-600">
                  {expandedEvent === event._id ? event.description : `${event.description.slice(0, 100)}...`} 
                  {event.description.length > 100 && (
                    <button 
                      onClick={() => toggleDescription(event._id)} 
                      className="text-blue-500 hover:underline"
                    >
                      {expandedEvent === event._id ? 'View Less' : 'View More'}
                    </button>
                  )}
                </p>
                {event.image && <img src={event.image} alt="Event Banner" className="w-full h-32 object-cover mt-4 rounded-md shadow-md" />}
              </div>
              <div className="flex flex-col justify-between items-center">
                <button onClick={() => deleteEventById(event._id)} className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Events;


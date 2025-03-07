import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaTrash, FaEdit, FaEye, FaPlus, FaSearch } from 'react-icons/fa';
import { fetchEvents, deleteEvent } from '../../api/event';
import AddEventModal from '../../Components/Modals/AddEventModal';
import ErrorBoundary from '../../components/ErrorBoundary';

function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    eventId: null,
    eventTitle: ""
  });

  useEffect(() => {
    loadEvents();
  }, []);

  // Auto-dismiss messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event) => {
    setDeleteConfirmation({
      isOpen: true,
      eventId: event._id,
      eventTitle: event.title
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEvent(deleteConfirmation.eventId);
      await loadEvents();
      setSuccess("Event deleted successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteConfirmation({ isOpen: false, eventId: null, eventTitle: "" });
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || 
                         (activeFilter === "upcoming" && new Date(event.date) > new Date()) ||
                         (activeFilter === "ended" && new Date(event.date) < new Date());
    return matchesSearch && matchesFilter;
  });

  return (
    <ErrorBoundary>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Events Management</h1>
        <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-customGreen text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-all"
        >
            <FaPlus /> Create Event
        </button>
        </div>

        {/* Search and Filters */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-customGreen focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {["all", "upcoming", "ended"].map((filter) => (
          <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  activeFilter === filter
                    ? "bg-customGreen text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter}
          </button>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Event Image */}
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    new Date(event.date) > new Date()
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}>
                    {new Date(event.date) > new Date() ? 'Upcoming' : 'Ended'}
                  </span>
                </div>
      </div>

              {/* Event Details */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-1">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                  <button 
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors"
                    title="Edit Event"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(event)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Event"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-customGreen border-t-transparent"></div>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmation.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Delete Event</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{deleteConfirmation.eventTitle}"?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirmation({ isOpen: false, eventId: null, eventTitle: "" })}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Event Modal */}
        {isModalOpen && (
          <AddEventModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              loadEvents();
              setSuccess("Event created successfully!");
            }}
          />
        )}

        {/* Toast Messages */}
        <div className="fixed bottom-4 right-4 z-50">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg mb-2">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg">
              {success}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Events;

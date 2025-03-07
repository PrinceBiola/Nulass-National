import React, { useEffect, useState } from 'react';
import NavWrapper from "../../Components/NavWrapper";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { fetchEvents } from "../../api/event";

function Eventss() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        // Convert date strings to Date objects
        const formattedEvents = fetchedEvents.map(event => ({
          ...event,
          date: new Date(event.date),
          time: new Date(event.time)
        }));
        setEvents(formattedEvents);
      } catch (error) {
        setError("Failed to fetch events.");
        console.error(error);
      }
    };
    loadEvents();
  }, []);

  const categories = ["all", ...new Set(events.map((event) => event.category))];

  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(event => event.category === activeFilter);

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  const formatTime = (time) => {
    try {
      return new Date(time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Time not available';
    }
  };

  return (
    <NavWrapper>
      <div className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">NULASS Events</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Stay connected with the NULASS community through our exciting events and programs.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      activeFilter === category
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                      {event.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1) : 'Uncategorized'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-500" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-green-500" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                    Register Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredEvents.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No events found matching your criteria.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-center py-12 text-red-600">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </NavWrapper>
  );
}

export default Eventss;

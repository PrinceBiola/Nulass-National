import React, { useState } from 'react';
import NavWrapper from "../../Components/NavWrapper";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaFilter, FaSearch } from 'react-icons/fa';
import Blog1 from '../../assets/Images/Blog1.jpeg';

function Eventss() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'academic', name: 'Academic' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'social', name: 'Social' }
  ];

  const events = [
    {
      title: "NULASS National Day Celebration",
      date: "July 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Lagos State University Main Campus",
      image: Blog1,
      description: "Join us for a day of cultural celebration, networking, and entertainment as we showcase the rich heritage of Lagos State.",
      category: "cultural",
      registrationLink: "/events/register",
      status: "upcoming"
    },
    {
      title: "Leadership Summit 2024",
      date: "August 5, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "University of Lagos, Multipurpose Hall",
      image: Blog1,
      description: "Develop your leadership skills with workshops and sessions led by prominent leaders and industry experts.",
      category: "leadership",
      registrationLink: "/events/register",
      status: "upcoming"
    },
    {
      title: "Career Fair & Networking",
      date: "September 10, 2024",
      time: "11:00 AM - 5:00 PM",
      location: "Lagos Continental Hotel",
      image: Blog1,
      description: "Connect with potential employers and industry professionals at our annual career fair.",
      category: "academic",
      registrationLink: "/events/register",
      status: "upcoming"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = activeFilter === 'all' || event.category === activeFilter || event.status === activeFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
                  className="w-full px-4 py-2 pl-10 rounded-lg border focus:ring-2 focus:ring-customGreen focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      activeFilter === category.id
                        ? 'bg-customGreen text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
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
                    <span className="bg-customGreen text-white text-sm px-3 py-1 rounded-full">
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
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
                      <FaCalendarAlt className="text-customGreen" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-customGreen" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-customGreen" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button className="w-full bg-customGreen text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                    Register Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No events found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </NavWrapper>
  );
}

export default Eventss;
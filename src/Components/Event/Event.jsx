import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';
import Blog1 from '../../assets/Images/Blog1.jpeg'

function Event() {
  const events = [
    {
      title: "NULASS National Day Celebration",
      date: "July 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Lagos State University Main Campus",
      image: Blog1,
      description: "Join us for a day of cultural celebration, networking, and entertainment as we showcase the rich heritage of Lagos State.",
      registrationLink: "/events/register"
    },
    {
      title: "Leadership Summit 2024",
      date: "August 5, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "University of Lagos, Multipurpose Hall",
      image: Blog1,
      description: "Develop your leadership skills with workshops and sessions led by prominent leaders and industry experts.",
      registrationLink: "/events/register"
    },
    {
      title: "Career Fair & Networking",
      date: "September 10, 2024",
      time: "11:00 AM - 5:00 PM",
      location: "Lagos Continental Hotel",
      image: Blog1,
      description: "Connect with potential employers and industry professionals at our annual career fair.",
      registrationLink: "/events/register"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-sm md:text-base text-customGreen font-semibold uppercase tracking-wider mb-2">
            What's Happening
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Stay connected with the NULASS community through our exciting events and programs.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {event.title}
                </h4>
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
                <Link to={event.registrationLink}>
                  <button className="w-full bg-customGreen text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                    Register Now
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See All Events Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/events" className="group inline-flex items-center gap-2 text-customGreen font-semibold hover:text-green-700 transition-colors">
            See All Events 
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Event;

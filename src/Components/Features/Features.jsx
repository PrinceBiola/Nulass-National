import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Features() {
  const features = [
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "Scholarship Opportunities",
      description: "Access exclusive scholarships and bursaries for Lagos State students, supporting academic excellence and reducing financial barriers to education.",
      color: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: <FaCalendarAlt className="w-8 h-8" />,
      title: "Events & Programs",
      description: "Participate in cultural festivals, leadership workshops, career fairs, and academic seminars designed to enhance your personal and professional growth.",
      color: "bg-green-50",
      iconColor: "text-customGreen",
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Networking",
      description: "Connect with fellow students, alumni, and industry leaders through our extensive network spanning institutions nationwide.",
      color: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      icon: <FaHandHoldingHeart className="w-8 h-8" />,
      title: "Student Support",
      description: "Benefit from our comprehensive support system including academic guidance, welfare services, and advocacy for student rights.",
      color: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-sm md:text-base text-customGreen font-semibold uppercase tracking-wider mb-2">
            What We Offer
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits of NULASS Membership
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Join NULASS and unlock a world of opportunities designed to support your academic journey
            and personal development.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${feature.color} rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow`}
            >
              <div className={`${feature.iconColor} mb-4`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <Link to="/apply" className="inline-block">
            <button className="bg-customGreen text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105">
              Apply Now
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;

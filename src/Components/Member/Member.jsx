import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaHandshake, FaUsers, FaAward } from 'react-icons/fa';
import MemberBg from '../../assets/Images/Blog1.jpeg';

function Member() {
  const benefits = [
    {
      icon: <FaUserGraduate className="w-6 h-6" />,
      title: "Academic Support",
      description: "Access scholarships, grants, and educational resources to support your academic journey."
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: "Networking",
      description: "Connect with fellow students, alumni, and industry professionals across Nigeria."
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Cultural Programs",
      description: "Participate in cultural events, festivals, and activities that celebrate Lagos heritage."
    },
    {
      icon: <FaAward className="w-6 h-6" />,
      title: "Leadership",
      description: "Develop leadership skills through workshops, seminars, and hands-on experience."
    }
  ];

  return (
    <section className="relative py-20 md:py-28">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={MemberBg}
          alt="NULASS Members"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-sm md:text-base text-customGreen font-semibold uppercase tracking-wider mb-2">
              Join Our Community
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Become a Member of NULASS Today!
            </h3>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Join thousands of Lagos State students in building a stronger, more connected 
              community. Your journey to excellence starts here.
            </p>

            <Link to="/signup">
              <button className="bg-customGreen text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 inline-flex items-center gap-2">
                Join Us Now
                <svg 
                  className="w-5 h-5" 
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
              </button>
            </Link>
          </motion.div>

          {/* Right Column - Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all"
              >
                <div className="text-customGreen mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-white text-xl font-semibold mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center">
            <h4 className="text-3xl md:text-4xl font-bold text-customGreen mb-2">5000+</h4>
            <p className="text-white">Active Members</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl md:text-4xl font-bold text-customGreen mb-2">100+</h4>
            <p className="text-white">Institutions</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl md:text-4xl font-bold text-customGreen mb-2">40+</h4>
            <p className="text-white">Years of Impact</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl md:text-4xl font-bold text-customGreen mb-2">98%</h4>
            <p className="text-white">Member Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Member;

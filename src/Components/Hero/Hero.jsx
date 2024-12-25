import React from 'react';
import { Link } from 'react-router-dom';
import HeroBg from '../../assets/Images/Blog1.jpeg'; // Make sure to add this image
import { motion } from 'framer-motion'; // Optional: for animations

function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center mt-28">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroBg}
          alt="NULASS Students"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-white text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Uniting Lagos State Students
            <span className="block text-customGreen">Nationwide</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-200">
            Join the largest community of Lagos State students, fostering unity, 
            excellence, and leadership across Nigeria.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8">
            <Link to="/signup">
              <button className="w-full sm:w-auto bg-customGreen hover:bg-opacity-90 text-white px-8 py-3 rounded-lg text-lg md:text-xl font-semibold transition-all transform hover:scale-105">
                Join NULASS
              </button>
            </Link>
            <Link to="/about">
              <button className="w-full sm:w-auto border-2 border-white hover:border-customGreen hover:text-customGreen text-white px-8 py-3 rounded-lg text-lg md:text-xl font-semibold transition-all transform hover:scale-105">
                Learn More
              </button>
            </Link>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Student Welfare</h3>
              <p className="text-gray-200">Supporting academic excellence and personal growth</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Leadership</h3>
              <p className="text-gray-200">Developing tomorrow's leaders today</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-200">Building lasting connections nationwide</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white"
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
}

export default Hero;

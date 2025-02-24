import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AboutImg from '../../assets/Images/Blog1.jpeg'; // Make sure to add this image

function About() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-12 rounded-xl overflow-hidden shadow-xl">
              <img
                src={AboutImg}
                alt="NULASS Students"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            {/* <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-customGreen rounded-xl -z-10"></div> */}
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-sm md:text-base text-customGreen font-semibold uppercase tracking-wider">
                About NULASS National
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Uniting Students, Building Leaders
              </h3>
            </div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              The National Union of Lagos State Students (NULASS) is dedicated to fostering unity, 
              cultural pride, and academic excellence among students of Lagos State origin. We serve 
              as a bridge connecting Lagos State students across various institutions nationwide.
            </p>

            <div className="grid grid-cols-2 gap-6 py-6">
              <div className="space-y-2">
                <h4 className="text-3xl md:text-4xl font-bold text-customGreen">5000+</h4>
                <p className="text-gray-600">Active Members</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl md:text-4xl font-bold text-customGreen">100+</h4>
                <p className="text-gray-600">Institutions</p>
              </div>
            </div>

            <Link to="/about">
              <button className="group flex items-center gap-2 text-customGreen font-semibold hover:text-green-700 transition-colors">
                Read More 
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
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;

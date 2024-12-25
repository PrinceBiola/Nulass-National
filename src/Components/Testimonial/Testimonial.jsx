import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import Student1 from '../../assets/Images/Blog1.jpeg'; // Add student images

function Testimonial() {
  const testimonials = [
    {
      quote: "NULASS gave me the platform to connect with like-minded students and celebrate my heritage. The networking opportunities have been invaluable for my career growth.",
      name: "Aisha Mohammed",
      role: "Final Year Student",
      school: "University of Lagos",
      image: Student1
    },
    {
      quote: "Through NULASS, I received a scholarship that helped fund my education. The support system and mentorship programs have been incredible.",
      name: "Oluwaseun Adebayo",
      role: "Recent Graduate",
      school: "Lagos State University",
      image: Student1
    },
    {
      quote: "Being part of NULASS leadership has developed my skills and opened doors to amazing opportunities. It's more than just a student union.",
      name: "Chidinma Okonkwo",
      role: "Chapter President",
      school: "Yaba College of Technology",
      image: Student1
    }
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
            Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Members Say
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Hear from students who have experienced the impact of NULASS firsthand.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaQuoteLeft className="text-customGreen text-3xl mb-4" />
              <blockquote className="text-gray-600 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <div className="text-sm text-gray-500">
                    <p>{testimonial.role}</p>
                    <p>{testimonial.school}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Testimonial Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
        >
          <div className="p-6 bg-customGreen/10 rounded-xl">
            <h4 className="text-3xl md:text-4xl font-bold text-customGreen mb-2">98%</h4>
            <p className="text-gray-600">Member Satisfaction</p>
          </div>
          <div className="p-6 bg-customGreen/10 rounded-xl">
            <h4 className="text-3xl md:text-4xl font-bold text-customGreen mb-2">5000+</h4>
            <p className="text-gray-600">Active Members</p>
          </div>
          <div className="p-6 bg-customGreen/10 rounded-xl">
            <h4 className="text-3xl md:text-4xl font-bold text-customGreen mb-2">100+</h4>
            <p className="text-gray-600">Partner Institutions</p>
          </div>
          <div className="p-6 bg-customGreen/10 rounded-xl">
            <h4 className="text-3xl md:text-4xl font-bold text-customGreen mb-2">40+</h4>
            <p className="text-gray-600">Years of Impact</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonial;

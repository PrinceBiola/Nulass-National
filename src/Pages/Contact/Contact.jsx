import React, { useState } from 'react'
import NavWrapper from '../../Components/NavWrapper'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <NavWrapper>
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-10">
        <h1 className=" pt-20 text-3xl md:text-4xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Address:</span>
                  Lagos State, Nigeria
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Email:</span>
                  info@nulass.org.ng
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Phone:</span>
                  08155248427, 08112127083
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62283124574!2d3.28395955!3d6.548055099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1734629104881!5m2!1sen!2sng" 
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-semibold">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter message subject"
                  className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-semibold">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                  rows="5"
                  className="border px-4 py-2 rounded-lg resize-none focus:ring-2 focus:ring-customGreen focus:outline-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-customGreen text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </NavWrapper>
  )

}


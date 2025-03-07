import React, { useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { FaEnvelope, FaPhone, FaPhoneAlt, FaTimes } from 'react-icons/fa';
import abiodun from '../../assets/Images/abiodun.jpg';
import hamid from '../../assets/Images/hamid.jpg';
import ajoke from '../../assets/Images/ajoke.jpg';
import bambo from '../../assets/Images/Bambo.jpg';
import { motion } from 'framer-motion';
import adeoye from '../../assets/images/adeoye.jpg';
import bada from '../../assets/images/bada.jpg';
import lawal from '../../assets/images/lawal.jpg';
import jamiu from '../../assets/Images/jamiu.jpg';
import president from '../../assets/Images/hafiz.jpg';
import isreal from '../../assets/images/isreal.jpg';

export default function About() {
  const [activeTab, setActiveTab] = useState("values");
  const [callModal, setCallModal] = useState({
    isOpen: false,
    name: '',
    phone: '',
    role: ''
  });

  const renderContent = () => {
    switch (activeTab) {
      case "values":
        return (
          <div className="animate-fadeIn">
            <h2 className="font-semibold text-2xl mb-4">Our Core Values</h2>
            <div className="space-y-4 text-slate-500">
              <p>
                1. <span className="font-semibold">Unity:</span> Fostering
                collaboration and solidarity among Lagos State students
                nationwide.
              </p>
              <p>
                2. <span className="font-semibold">Excellence:</span> Promoting
                academic and personal development.
              </p>
              <p>
                3. <span className="font-semibold">Leadership:</span> Developing
                future leaders to impact Lagos State and Nigeria positively.
              </p>
              <p>
                4. <span className="font-semibold">Advocacy:</span> Championing
                the rights and welfare of our members.
              </p>
              <p>
                5. <span className="font-semibold">Community:</span> Encouraging
                social responsibility and giving back to our communities.
              </p>
            </div>
          </div>
        );
      case "what":
        return (
          <div className="animate-fadeIn">
            <h2 className="font-semibold text-2xl mb-4">What We Do</h2>
            <div className="space-y-4 text-slate-500">
              <p>
                1. <span className="font-semibold">Student Welfare:</span>{" "}
                Advocating for the rights, privileges, and well-being of Lagos
                State students in tertiary institutions.
              </p>
              <p>
                2.{" "}
                <span className="font-semibold">Scholarships and Grants: </span>{" "}
                Facilitating financial aid opportunities to support academic
                excellence.
              </p>
              <p>
                3. <span className="font-semibold">Capacity Building:</span>{" "}
                Organizing training, workshops, and events to empower students
                with knowledge and skills.
              </p>
              <p>
                4. <span className="font-semibold">Cultural Integration: </span>{" "}
                Promoting Lagos State's rich heritage and culture through events
                and initiatives.
              </p>
              <p>
                5.{" "}
                <span className="font-semibold">Networking Opportunities:</span>{" "}
                Connecting members with mentors, industry leaders, and fellow
                students for career and personal growth.
              </p>
            </div>
          </div>
        );
      case "why":
        return (
          <div className="animate-fadeIn">
            <h2 className="font-semibold text-2xl mb-4">Why Join Us?</h2>
            <div className="space-y-4 text-slate-500">
              <p>
                • Access to academic and financial support programs.
              </p>
              <p>• Network with fellow Lagos State students nationwide</p>
              <p>• Leadership and mentorship opportunities.</p>
              <p>• Participation in cultural and social activities.</p>
              <p>• Advocacy for your rights and interests.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

    const leadershipTeam = [
      {
        name: 'Hafiz Olufowobi Remilekun',
        role: 'President',
        image: president,
        socials: {
          phone: "tel:+2349059675215",
          email: "holypheelz@gmail.com"
        }
      },
      {
        name: 'Bada Azeez Akinola',
        role: 'Nulass National Vice President I',
        image: bada,
        socials: {
          phone: "tel:+2347015281578",
          email: "azeezakinola3@gmail.com"
        }
      },
      {
        name: 'Nul. Comr. Lawal Oluwadarasimi Munir',
        role: 'Nulass National Vice President II (Diaspora)',
        image: lawal,
        socials: {
          phone: "tel:+2348156741355",
          email: "darasimilawal86@gmail.com"
        }
      },
      {
        name: "Remilekun Bambo",
        role: "General Secretary",
        image: bambo,
        socials: {
          phone: "tel:+2347087937504",
          email: "remlekbeauty2000@gmail.com"
        }
      },
      {
        name: "Abiodun F. Olusanya",
        role: "Assistant General Secretary",
        image: abiodun,
        socials: {
          phone: "tel:+2349067617290",
          email: "olusanyaabiodun97@gmail.com"
        }
      },
      {
        name: 'Nul. Adeoye Taiwo Samuel',
        role: 'Nulass National Pro1',
        image: adeoye,
        socials: {
          phone: "tel:+2349066086623",
          email: "adeoye@nulass.org"
        }
      },
      {
        name: 'Nul. Olatoye Jamiu Olarewaju',
        role: 'Nulass National Pro (Diaspora)',
        image: jamiu,
        socials: {
          phone: "tel:+2347017221722",
          email: "jamiuolatoye08@gmail.com"
        }
      },
      {
        name: "Oyekunle Abdulhamid Opeyemi",
        role: "Financial Secretary",
        image: hamid,
        socials: {
          phone: "tel:+2348146966407",
          email: "abdulhamidoyekunle@gmail.com"
        }
      },
      {
        name: "Ajoke Fatiah",
        role: "Treasurer",
        image: ajoke,
        socials: {
          phone: "tel:+2348087085265",
          email: "ajoke@nulass.org"
        }
      },
      {
        name: "Awoyemi Israel Olamide",
        role: "Welfare 1",
        image: isreal,
        socials: {
          phone: "tel:+2347016424768",
          email: "awoyemiisrael34@gmail.com"
        }
      }
    ];

  // Simplified call function
  const handleCallClick = (phone) => {
    window.location.href = phone; // phone already includes "tel:" prefix
  };

  // Add the modal component
  const CallModal = () => {
    if (!callModal.isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Calling...</h3>
            <button 
              onClick={() => setCallModal({ isOpen: false, name: '', phone: '', role: '' })}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-customGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhone size={32} className="text-customGreen animate-pulse" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">{callModal.name}</h4>
            <p className="text-customGreen font-medium text-sm mb-2">{callModal.role}</p>
            <p className="text-gray-600">{callModal.phone}</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setCallModal({ isOpen: false, name: '', phone: '', role: '' })}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <a
              href={`tel:${callModal.phone}`}
              className="flex-1 px-4 py-2 bg-customGreen text-white rounded-lg hover:bg-green-600 transition-colors text-center"
            >
              Call Again
            </a>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <NavWrapper>
      <div className="pt-32 md:pt-40 px-4 md:px-8 lg:px-20 pb-10">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">About Us</h2>
          <p className="text-slate-500 text-base md:text-lg">
            Discover NULASS National - Uniting Lagos State students nationwide.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="font-semibold text-2xl mb-4">Who We Are</h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            The National Union of Lagos State Students (NULASS National) is a
            unified body representing Lagos State students across institutions
            in Nigeria and beyond. Our mission is to foster unity, promote
            excellence, and advocate for the welfare and development of Lagos
            State students in all aspects of their academic and personal lives.
          </p>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed mt-4">
            We are committed to empowering Lagos State students through
            education, advocacy, and leadership, ensuring their voices are heard
            and their aspirations achieved. Founded in 1980, NULASS National has
            been a beacon of support and advocacy for Lagos State students. Over
            the years, we have achieved numerous milestones and continue to grow
            as a united and impactful organization dedicated to fostering
            excellence and unity.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={() => setActiveTab("values")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "values"
                  ? "bg-customGreen text-white"
                  : "bg-gray-100 text-slate-600 hover:bg-gray-200"
              }`}
            >
              Our Core Values
            </button>
            <button
              onClick={() => setActiveTab("what")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "what"
                  ? "bg-customGreen text-white"
                  : "bg-gray-100 text-slate-600 hover:bg-gray-200"
              }`}
            >
              What We Do
            </button>
            <button
              onClick={() => setActiveTab("why")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "why"
                  ? "bg-customGreen text-white"
                  : "bg-gray-100 text-slate-600 hover:bg-gray-200"
              }`}
            >
              Why Join Us?
            </button>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
            {renderContent()}
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600">Meet the dedicated individuals leading NULASS National</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {leadershipTeam.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-center space-x-4 mb-4">
                        <a 
                          href={leader.socials.phone}
                          className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-customGreen hover:text-white transition-all duration-300 group"
                          title={`Call ${leader.name}`}
                        >
                          <FaPhoneAlt 
                            size={20} 
                            className="transform -rotate-90 group-hover:rotate-0 transition-transform duration-300"
                          />
                        </a>
                        <a 
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(leader.socials.email)}&su=${encodeURIComponent(`Message for ${leader.name} - NULASS National`)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-customGreen hover:text-white transition-all duration-300"
                          title={`Email ${leader.name}`}
                        >
                          <FaEnvelope size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{leader.name}</h3>
                  <p className="text-customGreen font-medium text-sm">{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Render the call modal */}
        <CallModal />
      </div>
    </NavWrapper>
  );
}

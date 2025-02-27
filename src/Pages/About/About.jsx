import React, { useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import abiodun from '../../assets/Images/abiodun.jpg';
import hamid from '../../assets/Images/hamid.jpg';
import ajoke from '../../assets/Images/ajoke.jpg';
import bambo from '../../assets/Images/Bambo.jpg';
import { motion } from 'framer-motion';

export default function About() {
  const [activeTab, setActiveTab] = useState("values");

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
      name: "ABIODUN F. OLUSANYA",
      role: "Assistant General Secretary",
      image: abiodun,
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:abiodun@nulass.org"
      }
    },
    {
      name: "Oyekunle Abdulhamid Opeyemi",
      role: "Financial Secretary",
      image: hamid,
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:hamid@nulass.org"
      }
    },
    {
      name: "Ajoke Fatiah",
      role: "Treasurer",
      image: ajoke,
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:ajoke@nulass.org"
      }
    },
    {
      name: "Remilekun Bambo",
      role: "General Secretary",
      image: bambo,
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:bambo@nulass.org"
      }
    }
  ];

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a href={leader.socials.linkedin} className="text-white hover:text-customGreen transition-colors">
                      <FaLinkedin size={24} />
                    </a>
                    <a href={leader.socials.twitter} className="text-white hover:text-customGreen transition-colors">
                      <FaTwitter size={24} />
                    </a>
                    <a href={leader.socials.email} className="text-white hover:text-customGreen transition-colors">
                      <FaEnvelope size={24} />
                    </a>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-customGreen font-medium">{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}

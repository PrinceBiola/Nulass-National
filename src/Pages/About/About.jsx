import React, { useState } from "react";
import NavWrapper from "../../Components/NavWrapper";

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
      </div>
    </NavWrapper>
  );
}

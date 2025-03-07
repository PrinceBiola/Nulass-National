import React, { useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { FaAsterisk } from "react-icons/fa";

export default function Applications() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    department: "",
    level: "",
    matricNumber: "",
    address: "",
    lgaOrigin: "",
    stateResidence: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

  
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

   
    const phoneRegex = /^\d{11}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Valid 11-digit phone number is required";
    }


    const requiredFields = [
      'institution', 'department', 'level', 'matricNumber',
      'address', 'lgaOrigin', 'stateResidence'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
       
        console.log("Form data:", formData);
       
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect to payment page or show success message
        alert("Form submitted successfully! Redirecting to payment...");
        // You can add navigation here
      } catch (error) {
        alert("An error occurred. Please try again.");
        console.error("Submission error:", error);
      }
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const renderField = (name, label, type = "text", options = null) => (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        {label} <FaAsterisk className="inline text-red-500 text-xs" />
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select your level</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{`${opt} Level`}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
          rows="3"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <NavWrapper>
      <div className="pt-48 pb-16 bg-slate-50 flex items-center justify-center">
        <div className="shadow-lg bg-white w-full max-w-4xl rounded-lg">
          <div className="text-center mb-10">
            <h1 className="pt-10 text-3xl md:text-4xl font-bold text-center mb-4">
              Application For NULASS ID
            </h1>
            <p className="font-medium text-slate-500 text-lg px-4">
              Please fill out the application form below with accurate details.
              All fields marked with <FaAsterisk className="inline text-red-500 text-xs" /> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
           
            <div className="grid md:grid-cols-2 gap-6">
              {renderField("firstName", "First Name")}
              {renderField("lastName", "Last Name")}
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {renderField("email", "Email Address", "email")}
              {renderField("phone", "Phone Number", "tel")}
            </div>

            {/* Academic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {renderField("institution", "Institution")}
              {renderField("department", "Department")}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {renderField("level", "Level", "select", ["100", "200", "300", "400", "500"])}
              {renderField("matricNumber", "Matric Number")}
            </div>

            {/* Location Information */}
            {renderField("address", "Address", "textarea")}

            <div className="grid md:grid-cols-2 gap-6">
              {renderField("lgaOrigin", "LGA of Origin")}
              {renderField("stateResidence", "State of Residence")}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-customGreen text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </NavWrapper>
  );
}

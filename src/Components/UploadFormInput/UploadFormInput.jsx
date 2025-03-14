import React from 'react';

const UploadFormInput = ({ label, name, value, onChange, required = false, type = 'text' }) => {
  const handleChange = (e) => {
    // Pass both the name and value to the parent component
    onChange(name, e.target.value);
  };

  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-[400] text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        className={`placeholder:text-[#c6c6c6] placeholder:font-[300] placeholder:text-[10px] block w-full border-[0.5px] border-[#6c6c6c] rounded-md p-3 focus:border-custom-green focus:border-[0.5px] focus:outline-none`}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default UploadFormInput;

import React from 'react';

const UploadFormTextarea = ({
    label,
    placeholder,
    value,
    name,
    onChange,
    rows = 5, // Default rows value
    required = false
  }) => {
    const handleChange = (e) => {
      onChange(name, e.target.value);
    };

    return (
      <div className="mb-4 w-full">
        <label className="block text-sm font-[400] text-gray-700 mb-1">
          {label}
        </label>
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          rows={rows}  // Set rows dynamically
          className="placeholder:text-[#c6c6c6] placeholder:font-[300] placeholder:text-[10px] block w-full border-[0.5px] border-[#6c6c6c] rounded-md p-3 focus:border-custom-green focus:border-[0.5px] focus:outline-none"
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  };
  
  export default UploadFormTextarea;
  
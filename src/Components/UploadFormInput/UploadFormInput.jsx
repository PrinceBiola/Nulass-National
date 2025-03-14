const UploadFormInput = ({ label, placeholder, name, type = "text", value, onChange, disabled = false, required = false }) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-[400] text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        className={`placeholder:text-[#c6c6c6] placeholder:font-[300] placeholder:text-[10px] block w-full border-[0.5px] border-[#6c6c6c] rounded-md p-3 focus:border-custom-green focus:border-[0.5px] focus:outline-none ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default UploadFormInput;

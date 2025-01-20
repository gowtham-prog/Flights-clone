import { useState } from 'react';

const InputField = ({ label, type, value, onChange, placeholder, disabled = false }) => {
  // Use state to track the current input type
  const [currentType, setCurrentType] = useState(type);

  const handleFocus = () => {
    if (currentType === 'date') {
      setCurrentType('date');
    }
  };

  const handleBlur = () => {
    if (currentType === 'date') {
      setCurrentType('text');
    }
  };

  return (
    <div>
      {/* <label className="block text-sm font-medium text-gray-700 dark:text-[#aeb1b6] ">{label}</label> */}
      <input
        type={currentType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`mt-1 p-4 block w-full outline-none rounded-lg dark:bg-[#36373a] border dark:border-[#6e7277] hover:dark:border-[#aeb1b6] focus:border-b dark:text-[#aeb1b6] shadow-sm focus:border-blue-500 transition-all duration-300 ${disabled ? "bg-gray-100 cursor-not-allowed" : "hover:shadow-md"}`}
      />
    </div>
  );
};

export default InputField;

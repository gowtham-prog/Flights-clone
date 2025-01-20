import React from "react";

const Dropdown = ({ label, options, value, onChange }) => {
    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className="relative flex flex-row">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 p-2 block w-fit rounded-lg outline-none 
                    bg-white dark:bg-[#36373a] 
                    text-gray-800 dark:text-[#aeb1b6] 
                    border border-gray-300 dark:border-gray-600
                    shadow-sm 
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                    focus:border-blue-500 dark:focus:border-blue-600
                    hover:shadow-lg 
                    transition-all duration-300 ease-in-out"
            >
                {/* <option 
                    disabled 
                    value=""
                    className="text-gray-500 dark:text-gray-400"
                >
                    {label}
                </option> */}
                {options.map((option) => (
                    <option
                        className="py-2 text-gray-800 dark:text-gray-200 
                            bg-white dark:bg-[#36373a]
                            hover:bg-gray-100 dark:hover:bg-[#4c5667]"
                        key={option.key}
                        value={option.key}
                    >
                        {option.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;


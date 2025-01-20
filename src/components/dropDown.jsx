import React from "react";
import { FaChair, FaPlane, FaUsers } from 'react-icons/fa'; // Import icons

const Dropdown = ({ label, options, value, onChange, type }) => {
    const selectedOption = options.find((option) => option.value === value);

    // Function to get icon based on dropdown type
    const getIcon = () => {
        switch (type) {
            case 'trip':
                return <FaPlane className="w-4 h-4" />;
            case 'travelers':
                return <FaUsers className="w-4 h-4" />;
            case 'class':
                return <FaChair className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        // <div className="relative flex flex-row">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 p-2 flex w-fit rounded-lg outline-none 
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
                        <span className="md:hidden flex items-center">
                            {getIcon()}
                        </span>
                        <span className="hidden md:inline">
                            {option.value}
                        </span>
                    </option>
                ))}
            </select>
        // {/* </div> */}
    );
};

export default Dropdown;


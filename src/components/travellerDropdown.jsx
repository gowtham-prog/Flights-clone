import React, { useEffect, useRef, useState } from "react";
import { FaUsers } from 'react-icons/fa';

const TravellerDropdown = ({ label, options, value, onChange }) => {
    const dropdownRef = useRef(null);
    const [counts, setCounts] = useState(
        value || options.reduce((acc, option) => ({ ...acc, [option.key]: 0 }), {})
    );
    const [isOpen, setIsOpen] = useState(false);

    const increment = (key) => {
        setCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    };

    const decrement = (key) => {
        setCounts((prev) => ({
            ...prev,
            [key]: prev[key] > 0 ? prev[key] - 1 : 0,
        }));
    };

    const handleDone = () => {
        onChange(counts);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setCounts(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block">
            {/* Dropdown button */}
            <button
                className="mt-1 p-2 block w-fit rounded-lg outline-none 
                    dark:text-[#aeb1b6] dark:bg-[#36373a] 
                    border-gray-300 shadow-sm 
                    dark:focus:bg-[#4c5667] focus:border-2 focus:border-b focus:border-blue-500 
                    hover:shadow-lg transition-all duration-300 ease-in-out"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="md:hidden">
                    <FaUsers className="w-4 h-4" />
                </span>
                <span className="hidden md:inline">
                    {label}
                </span>
            </button>

            {/* Dropdown content */}
            {isOpen && (
                <div 
                    ref={dropdownRef} 
                    className="absolute mt-2 w-64 rounded-lg shadow-lg p-4 z-10
                        bg-white dark:bg-[#36373a] 
                        text-gray-800 dark:text-gray-200"
                >
                    {options.map((option) => (
                        <div
                            key={option.key}
                            className="flex justify-between items-center py-2 
                                border-b border-gray-200 dark:border-gray-600 
                                last:border-b-0"
                        >
                            <div className="text-sm font-medium">{option.value}</div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => decrement(option.key)}
                                    className="w-8 h-8 rounded flex justify-center items-center
                                        bg-gray-100 hover:bg-gray-200 
                                        dark:bg-gray-700 dark:hover:bg-gray-600 
                                        text-gray-600 dark:text-gray-200
                                        transition-colors duration-200"
                                >
                                    –
                                </button>
                                <div className="w-8 text-center">{counts[option.key]}</div>
                                <button
                                    onClick={() => increment(option.key)}
                                    className="w-8 h-8 rounded flex justify-center items-center
                                        bg-blue-500 hover:bg-blue-600 
                                        dark:bg-blue-600 dark:hover:bg-blue-700
                                        text-white
                                        transition-colors duration-200"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Footer buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="text-gray-500 hover:text-gray-700 
                                dark:text-gray-400 dark:hover:text-gray-200
                                transition-colors duration-200"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 rounded
                                bg-blue-500 hover:bg-blue-600 
                                dark:bg-blue-600 dark:hover:bg-blue-700
                                text-white
                                transition-colors duration-200"
                            onClick={handleDone}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravellerDropdown;

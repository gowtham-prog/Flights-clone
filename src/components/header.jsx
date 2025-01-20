import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sideBarRef = useRef(null);
    useEffect(() => {
            const handleOutsideClick = (event) => {
                if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                    setIsMenuOpen(false);
                }
            };
            document.addEventListener("mousedown", handleOutsideClick);
            return () => {
                document.removeEventListener("mousedown", handleOutsideClick);
            };
        }, [isMenuOpen]);

    return (
        <header className="bg-white dark:bg-[#36373a] shadow-md transition-colors duration-300">
            <nav className="relative max-w-7xl mx-auto px-4 py-2">
                
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 -ml-2 md:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#4c4d51] rounded-full"
                >
                    {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                </button>

                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex items-center space-x-8 py-1">
                    
                    <a 
                        href="#" 
                        className="border-b-4 border-blue-500 dark:border-blue-400 py-2 text-blue-600 dark:text-blue-400"
                    >
                        Flights
                    </a>
                    <a 
                        href="#" 
                        className="border-b-4 border-transparent py-2 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    >
                        Hotels
                    </a>
                    <a 
                        href="#" 
                        className="border-b-4 border-transparent py-2 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    >
                        Packages
                    </a>
                    <a 
                        href="#" 
                        className="border-b-4 border-transparent py-2 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    >
                        Explore
                    </a>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div ref={sideBarRef} className="md:hidden fixed inset-0 top-0 bg-white dark:bg-[#36373a] z-50 mr-[64px]">
                        <div className="flex flex-col p-4 space-y-4">
                            <a 
                                href="#" 
                                className="flex items-center space-x-4 px-4 py-3 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#4c4d51] rounded-lg"
                            >
                                Flights
                            </a>
                            <a 
                                href="#" 
                                className="flex items-center space-x-4 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#4c4d51] rounded-lg"
                            >
                                Hotels
                            </a>
                            <a 
                                href="#" 
                                className="flex items-center space-x-4 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#4c4d51] rounded-lg"
                            >
                                Packages
                            </a>
                            <a 
                                href="#" 
                                className="flex items-center space-x-4 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#4c4d51] rounded-lg"
                            >
                                Explore
                            </a>
                            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                                <button className="flex items-center space-x-4 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#4c4d51] rounded-lg w-full">
                                    <FaUser className="w-5 h-5" />
                                    <span>Sign in</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;

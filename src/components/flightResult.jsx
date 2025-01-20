import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaClock, FaPlane, FaSuitcase } from 'react-icons/fa';

const FlightsResult = ({ flights }) => {
    const [expandedFlight, setExpandedFlight] = useState(null);

    if (!flights || flights.length === 0) return null;

    const toggleExpand = (legIndex, flightIndex) => {
        const key = `${legIndex}-${flightIndex}`;
        setExpandedFlight(expandedFlight === key ? null : key);
    };

    return (
        <div className="mt-8 w-full max-w-4xl mx-auto">
            {flights.map((legFlights, legIndex) => (
                <div key={legIndex} className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-[#7d7e81] mb-4">
                        Flight {legIndex + 1}
                    </h2>
                    
                    {legFlights.length === 0 ? (
                        <div className="text-center py-8">
                            <FaPlane className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">No flights found. Try adjusting your search.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {legFlights.map((flight, flightIndex) => (
                                <div
                                    key={`${legIndex}-${flightIndex}`}
                                    className="bg-white dark:bg-[#36373a] rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Main Flight Info - Always Visible */}
                                    <div 
                                        onClick={() => toggleExpand(legIndex, flightIndex)}
                                        className="p-4 cursor-pointer flex flex-col md:flex-row md:items-center md:justify-between"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={flight.airlineLogo}
                                                alt={flight.airline}
                                                className="w-12 h-12 object-contain"
                                            />
                                            <div>
                                                <p className="text-lg font-medium dark:text-gray-200">
                                                    {flight.airline}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Flight {flight.flightNumber}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-center">
                                                    <p className="font-medium dark:text-gray-200">{flight.departureTime}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {flight.originCity} ({flight.origin})
                                                    </p>
                                                </div>
                                                <FaPlane className="text-gray-400 dark:text-gray-500 transform rotate-90" />
                                                <div className="text-center">
                                                    <p className="font-medium dark:text-gray-200">{flight.arrivalTime}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {flight.destinationCity} ({flight.destination})
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <p className="text-xl font-bold text-blue-500 dark:text-blue-400">
                                                    {flight.price}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {flight.stops === 0 ? "Nonstop" : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                                                </p>
                                            </div>
                                        </div>

                                        <button className="ml-4">
                                            {expandedFlight === `${legIndex}-${flightIndex}` ? 
                                                <FaChevronUp className="text-gray-400 dark:text-gray-500" /> : 
                                                <FaChevronDown className="text-gray-400 dark:text-gray-500" />
                                            }
                                        </button>
                                    </div>

                                    {/* Expanded Details */}
                                    {expandedFlight === `${legIndex}-${flightIndex}` && (
                                        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                                <FaClock className="w-4 h-4" />
                                                <span>Duration: {flight.duration}</span>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                                <FaSuitcase className="w-4 h-4" />
                                                <span>Baggage included</span>
                                            </div>

                                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    Operated by {flight.airline}
                                                </div>
                                                <button
                                                    className="bg-blue-500 text-white px-6 py-2 rounded-full 
                                                        hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                        transition-all duration-300"
                                                >
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FlightsResult;

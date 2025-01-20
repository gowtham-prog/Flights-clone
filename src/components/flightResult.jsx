import React from "react";

const FlightsResult = ({ flights }) => (
    <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-[#7d7e81] mb-4">Search Results</h2>
        {flights.length === 0 ? (
            <p className="text-gray-500 dark:text-white">No flights found. Try adjusting your search.</p>
        ) : (
            <div className="space-y-4">
                {flights.map((flight, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center">
                            <img
                                src={flight.airlineLogo}
                                alt={flight.airline}
                                className="w-12 h-12 mr-4"
                            />
                            <div>
                                <p className="text-lg font-medium">
                                    {flight.airline} - Flight {flight.flightNumber}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {flight.originCity} ({flight.origin}) →{" "}
                                    {flight.destinationCity} ({flight.destination})
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-gray-700 dark:text-[#aeb1b6] ">Departure</p>
                                <p>{flight.departureTime}</p>
                            </div>
                            <div>
                                <p className="text-gray-700 dark:text-[#aeb1b6] ">Arrival</p>
                                <p>{flight.arrivalTime}</p>
                            </div>
                            <div>
                                <p className="text-gray-700 dark:text-[#aeb1b6] ">Duration</p>
                                <p>{flight.duration}</p>
                            </div>
                        </div>
                        <p className="text-gray-500 mt-2">
                            Stops: {flight.stops === 0 ? "Direct" : `${flight.stops} stops`}
                        </p>
                        <p className="text-lg font-semibold text-blue-500 mt-2">
                            {flight.price}
                        </p>
                        <button
                            className="mt-4 bg-blue-500 text-white  px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default FlightsResult;

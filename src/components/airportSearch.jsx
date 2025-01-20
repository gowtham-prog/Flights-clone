import React, { useState } from "react";

const AirportSearch = ({ label, value, onChange, apiKey }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAirports = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": apiKey,
                        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
                    },
                }
            );

            const data = await response.json();
            if (data.status) {
                setSuggestions(
                    data.data.map((airport) => ({
                        name: airport.presentation.title,
                        code: airport.skyId,
                        entityId: airport.entityId,
                    }))
                );
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching airport data:", error);
            setSuggestions([]);
        }

        setLoading(false);
    };

    return (
        <div className="relative">
            {/* <label className="block text-sm font-medium text-gray-700 dark:text-[#aeb1b6] dark:bg-[#36373a]">{label}</label> */}
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    fetchAirports(e.target.value);
                }}
                placeholder={label}
                className="mt-1 p-4 block w-full outline-none rounded-lg dark:bg-[#36373a] border dark:border-[#6e7277] hover:dark:border-[#aeb1b6] shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:shadow-md transition-all duration-300"
            />
            {loading && <div className="absolute mt-1 text-gray-500 text-sm">Loading...</div>}
            {suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                onChange(suggestion.name, suggestion.code, suggestion.entityId);
                                setSuggestions([]);
                            }}
                            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-blue-100"
                        >
                            {suggestion.name} ({suggestion.code})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AirportSearch;

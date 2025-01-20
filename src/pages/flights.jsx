import React, { useState } from "react";
import AirportSearch from "../components/airportSearch";
import Dropdown from "../components/dropDown";
import FlightsResult from "../components/flightResult";
import InputField from "../components/inputField";
import Layout from "../components/layout";
import TravellerDropdown from "../components/travellerDropdown";
import { API_KEY } from "../config";

export default function Flights() {
    const [tripType, setTripType] = useState("One Way");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [fromAirportCode, setFromAirportCode] = useState("");
    const [toAirportCode, setToAirportCode] = useState("");
    const [originEntityId, setOriginEntityId] = useState("");
    const [destinationEntityId, setDestinationEntityId] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [travelers, setTravelers] = useState({
        adults: 1,
        childrens: 0,
        infants: 0,
    });
    const [flightClass, setFlightClass] = useState("economy");
    const [flights, setFlights] = useState([]);
    const [multiCityLegs, setMultiCityLegs] = useState([
        { from: "", to: "", fromCode: "", toCode: "", fromEntityId: "", toEntityId: "", departureDate: "" },
        { from: "", to: "", fromCode: "", toCode: "", fromEntityId: "", toEntityId: "", departureDate: "" }
    ]);
    const tripOptions = [
        { value: 'Round Trip', key: 'Round Trip' },
        { value: 'One Way', key: 'One Way' },
        { value: 'Multi-City', key: 'Multi-City'},
    ];
    const travellerOptions = [
        {value:"Adults", key:"adults"},
        {value:"Children", key:"childrens"},
        {value:"Infants", key:"infants"},
    ]
    const classOptions = [
        {value:"Economy", key:"economy"},
        {value:"Premium Economy", key:"premium_economy"},
        {value:"Business", key: "business"},
        {value: "First Class", key:"first"},
    ]

    const handleSearch = async () => {
        try {
            if (tripType === "Multi-City") {
                // Handle multi-city search
                const promises = multiCityLegs.map(leg => 
                    fetch(
                        `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${leg.fromCode}&destinationSkyId=${leg.toCode}&originEntityId=${leg.fromEntityId}&destinationEntityId=${leg.toEntityId}&date=${leg.departureDate}&cabinClass=${flightClass}&adults=${travelers.adults}&childrens=${travelers.childrens}&infants=${travelers.infants}&sortBy=best&currency=USD&market=en-US&countryCode=US`,
                        {
                            method: "GET",
                            headers: {
                                "x-rapidapi-key": API_KEY,
                                "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
                            },
                        }
                    ).then(res => res.json())
                );

                const results = await Promise.all(promises);
                const allFlights = results.map((data, index) => {
                    if (data.status && data.data.itineraries.length > 0) {
                        return data.data.itineraries.map((itinerary) => ({
                            ...mapItineraryToFlight(itinerary),
                            legIndex: index + 1
                        }));
                    }
                    return [];
                });
                setFlights(allFlights);
            } else {
                // Existing one-way/round-trip logic
                const response = await fetch(
                    `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${fromAirportCode}&destinationSkyId=${toAirportCode}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${departureDate}${returnDate ? `&returnDate=${returnDate}` : ''}&cabinClass=${flightClass}&adults=${travelers.adults}&childrens=${travelers.childrens}&infants=${travelers.infants}&sortBy=best&currency=USD&market=en-US&countryCode=US`,
                    {
                        method: "GET",
                        headers: {
                            "x-rapidapi-key": API_KEY,
                            "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
                        },
                    }
                );

                const data = await response.json();
                if (data.status && data.data.itineraries.length > 0) {
                    setFlights([data.data.itineraries.map(itinerary => mapItineraryToFlight(itinerary))]);
                } else {
                    setFlights([]);
                }
            }
        } catch (error) {
            console.error("Error fetching flights:", error);
            setFlights([]);
        }
    };

    const mapItineraryToFlight = (itinerary) => {
        const leg = itinerary.legs[0];
        const carrier = leg.carriers.marketing[0];
        return {
            id: itinerary.id,
            price: itinerary.price.formatted || "Unavailable",
            origin: leg.origin.displayCode,
            destination: leg.destination.displayCode,
            originCity: leg.origin.city,
            destinationCity: leg.destination.city,
            departureTime: new Date(leg.departure).toLocaleTimeString(),
            arrivalTime: new Date(leg.arrival).toLocaleTimeString(),
            duration: `${Math.floor(leg.durationInMinutes / 60)}h ${leg.durationInMinutes % 60}m`,
            stops: leg.stopCount,
            airline: carrier.name,
            airlineLogo: carrier.logoUrl,
            flightNumber: leg.segments[0].flightNumber,
        };
    };

    const handleMultiCityLegChange = (index, field, value, code = null, entityId = null) => {
        const updatedLegs = [...multiCityLegs];
        updatedLegs[index][field] = value;
        if (field === 'from') {
            updatedLegs[index].fromCode = code;
            updatedLegs[index].fromEntityId = entityId;
        } else if (field === 'to') {
            updatedLegs[index].toCode = code;
            updatedLegs[index].toEntityId = entityId;
        }
        setMultiCityLegs(updatedLegs);
    };

    const addFlight = () => {
        if (multiCityLegs.length < 6) { // Maximum 6 flights like Google Flights
            setMultiCityLegs([
                ...multiCityLegs,
                { from: "", to: "", fromCode: "", toCode: "", fromEntityId: "", toEntityId: "", departureDate: "" }
            ]);
        }
    };

    const removeFlight = (index) => {
        if (multiCityLegs.length > 2) { // Minimum 2 flights for multi-city
            const updatedLegs = multiCityLegs.filter((_, i) => i !== index);
            setMultiCityLegs(updatedLegs);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 text-black dark:bg-[#202124] dark:text-white flex items-center justify-center p-4">
                <div className="flex flex-col w-full items-center justify-center">
                    <h1 className="text-[56px] font-OpenSans font-normal text-gray-800 dark:text-[#e8eaed] mb-6 text-center">Flights</h1>

                    <div className="w-full relative max-w-4xl shadow-dialogueShadow bg-white dark:bg-[#36373a] dark:text-white rounded-2xl p-6 lg:p-10">

                        <div className="flex md:w-2/3 w-full justify-between items-start gap-6">
                            <Dropdown
                                label="Trip type"
                                options={tripOptions}
                                value={tripType}
                                onChange={setTripType}
                            />
                            <TravellerDropdown
                                label="Travelers"
                                options={travellerOptions}
                                value={travelers}
                                onChange={setTravelers}
                            />
                            <Dropdown
                                label="Class"
                                options={classOptions}
                                value={flightClass}
                                onChange={setFlightClass}
                            />
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                            }}
                            className="space-y-6 p-2"
                        >
                            {/* From and To Fields */}
                            {tripType !== "Multi-City" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <AirportSearch
                                        label="Where from?"
                                        value={from}
                                        onChange={(name, code, entityId) => {
                                            setFrom(name);
                                            setFromAirportCode(code);
                                            setOriginEntityId(entityId);
                                        }}
                                        apiKey={API_KEY}
                                    />
                                    <AirportSearch
                                        label="Where to?"
                                        value={to}
                                        onChange={(name, code, entityId) => {
                                            setTo(name);
                                            setToAirportCode(code);
                                            setDestinationEntityId(entityId);
                                        }}
                                        apiKey={API_KEY}
                                    />
                                </div>
                            )}

                            {/* Multi-City Inputs */}
                            {tripType === "Multi-City" && (
                                <div className="space-y-4">
                                    {multiCityLegs.map((leg, index) => (
                                        <div key={index} className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-50 dark:bg-[#3c3d40] p-4 rounded-lg">
                                            <AirportSearch
                                                label={`From ${index + 1}`}
                                                value={leg.from}
                                                onChange={(name, code, entityId) => 
                                                    handleMultiCityLegChange(index, 'from', name, code, entityId)}
                                                apiKey={API_KEY}
                                            />
                                            <AirportSearch
                                                label={`To ${index + 1}`}
                                                value={leg.to}
                                                onChange={(name, code, entityId) => 
                                                    handleMultiCityLegChange(index, 'to', name, code, entityId)}
                                                apiKey={API_KEY}
                                            />
                                            <InputField
                                                placeholder={`Departure ${index + 1}`}
                                                type="date"
                                                value={leg.departureDate}
                                                onChange={(value) => handleMultiCityLegChange(index, 'departureDate', value)}
                                            />
                                            {multiCityLegs.length > 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFlight(index)}
                                                    className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {multiCityLegs.length < 6 && (
                                        <button
                                            type="button"
                                            onClick={addFlight}
                                            className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-600"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            Add another flight
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Dates */}
                            {tripType !== "Multi-City" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <InputField
                                        placeholder="Departure"
                                        type="date"
                                        value={departureDate}
                                        onChange={setDepartureDate}
                                    />
                                    <InputField
                                        placeholder="Return"
                                        type="date"
                                        value={returnDate}
                                        onChange={setReturnDate}
                                        disabled={tripType === "One Way"}
                                    />
                                </div>
                            )}

                            <div className="flex w-full items-center justify-center absolute -bottom-6 left-0 right-0">
                                <button
                                    type="submit"
                                    className="w-fit bg-blue-500 text-white py-3 px-6 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 focus:ring focus:ring-blue-300"
                                >
                                    Search Flights
                                </button>
                            </div>
                        </form>

                    </div>
                    {/* Flight Results */}
                    <FlightsResult flights={flights} />
                </div>
            </div>
        </Layout>
    );
}

const TripTypeSelector = ({ tripType, setTripType }) => {
    const options = ["round-trip", "one-way", "multi-city"];
    return (
        <div className="flex space-x-4 mb-6">
            {options.map((type) => (
                <button
                    key={type}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${tripType === type
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-500 border-gray-300"
                        }`}
                    onClick={() => setTripType(type)}
                >
                    {type.replace("-", " ").replace(/\^\w/, (c) => c.toUpperCase())}
                </button>
            ))}
        </div>
    );
};


export default TripTypeSelector;

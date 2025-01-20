const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">Google Flights Clone</h1>
                <div className="hidden md:flex space-x-6">
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition">Home</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition">Flights</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition">Hotels</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition">Explore</a>
                </div>
                <div className="md:hidden">
                    <button className="text-gray-700 hover:text-blue-600 focus:outline-none">Menu</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;

const Header = () => {
    return (
        <header className="bg-white dark:bg-[#36373a] shadow-md transition-colors duration-300">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Google Flights Clone
                </h1>
                <div className="hidden md:flex space-x-6">
                    <a 
                        href="#" 
                        className="text-gray-700 dark:text-gray-300 
                            hover:text-blue-600 dark:hover:text-blue-400 
                            transition-colors duration-200"
                    >
                        Home
                    </a>
                    <a 
                        href="#" 
                        className="text-gray-700 dark:text-gray-300 
                            hover:text-blue-600 dark:hover:text-blue-400 
                            transition-colors duration-200"
                    >
                        Flights
                    </a>
                    <a 
                        href="#" 
                        className="text-gray-700 dark:text-gray-300 
                            hover:text-blue-600 dark:hover:text-blue-400 
                            transition-colors duration-200"
                    >
                        Hotels
                    </a>
                    <a 
                        href="#" 
                        className="text-gray-700 dark:text-gray-300 
                            hover:text-blue-600 dark:hover:text-blue-400 
                            transition-colors duration-200"
                    >
                        Explore
                    </a>
                </div>
                <div className="md:hidden">
                    <button 
                        className="text-gray-700 dark:text-gray-300 
                            hover:text-blue-600 dark:hover:text-blue-400 
                            focus:outline-none 
                            transition-colors duration-200"
                    >
                        Menu
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;

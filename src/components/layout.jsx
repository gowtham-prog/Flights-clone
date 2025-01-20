import Header from './header';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const Layout = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-[#202124] dark:text-white">
            <Header />
            <main className="flex-grow p-4 md:p-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

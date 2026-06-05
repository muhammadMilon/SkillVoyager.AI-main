import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Pages where Footer should NOT appear
const NO_FOOTER_ROUTES = ['/admin-dashboard'];

const MainLayout = () => {
    const { pathname } = useLocation();
    const showFooter = !NO_FOOTER_ROUTES.includes(pathname);

    return (
        <div className="flex flex-col min-h-screen transition-colors">
            <Navbar />
            <main className="flex-grow min-h-screen relative">
                <Outlet />
            </main>

            {showFooter && <Footer />}
        </div>
    );
};

export default MainLayout;
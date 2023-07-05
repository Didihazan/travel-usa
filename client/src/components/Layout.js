import React from 'react';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div className="layout-container">
            {/* Place the common header, navigation, or any other components here */}
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;

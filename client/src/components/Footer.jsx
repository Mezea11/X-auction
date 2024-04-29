//reviewed

import React from 'react';

const Footer = ({ position }) => {
    return (
        <footer className={`footer ${position}`}>
            <div className="footer-container">
                <p>&copy; 2024 X-Auction. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

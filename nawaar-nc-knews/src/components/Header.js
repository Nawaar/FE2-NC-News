import React from 'react';
import './Header.css';

const Header = ({ currentUser }) => {
    return (
        <div className="header">
            NC-Knews
            {currentUser && <p>{currentUser.username}{currentUser.name}</p>}
        </div>
    );
};

export default Header;
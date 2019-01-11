import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import PropTypes from 'prop-types';

const Header = ({ currentUser }) => {
    return (
        <div className="header">
            <a href='/'><img src={logo} alt="Logo" className="logo" /></a>
            <h1>NC-Knews - Cohort 27 - Talk</h1>
            {currentUser &&
                <section className="user">
                    <img src={currentUser.avatar_url} alt="avatar" />
                    <p id='name'>{currentUser.name}</p>
                    <p id='username'>{currentUser.username}</p>
                </section>
            }
        </div>
    );
};

Header.propTypes = {
    currentUser: PropTypes.object
};

export default Header;
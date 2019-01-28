import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Glyphicon } from 'react-bootstrap';

const Header = ({ currentUser, handleNav }) => {
    return (
        <div className="header">
            <span>
                <Glyphicon glyph="align-justify" className="icon" onClick={handleNav} />
                <Link to='/'><img src={logo} alt="Logo" className="logo" /></Link>
            </span>
            <h1>NC-Knews - Cohort 27 - Gossip</h1>
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
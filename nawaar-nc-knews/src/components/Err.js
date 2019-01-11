import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

class Err extends Component {
    render() {
        return (
            <>
                <p>Sorry, this page does not exist or something miraculasly went wrong.</p>
                <button className="navigateButton" onClick={this.handleClick}>Go to Home Page</button>
            </>
        );
    }

    handleClick = () => {
        navigate('/', { replace: true })
    }
}

Err.propTypes = {

};

export default Err;
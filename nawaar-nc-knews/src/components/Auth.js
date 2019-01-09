import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class Auth extends Component {
    state = {
        username: 'happyamy2016',
        password: 'mkjghfgdrtytuyit76r5e64rdfty',
        falseAttempt: false
    }
    render() {
        const { username, password, falseAttempt } = this.state;
        const { token, children } = this.props
        return (
            token
                ? children
                : <form onSubmit={this.submitLogin}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" onChange={this.handleChange} value={username} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={this.handleChange} value={password} />
                    <button>Log in</button>
                    {falseAttempt && <p>WRONG!!</p>}
                </form>
        );
    }

    handleChange = ({ target: { value, id } }) => {
        this.setState({
            [id]: value
        })
    }

    submitLogin = (event) => {
        event.preventDefault()
        const { username, password } = this.state
        api
            .loginAndGetToken(username, password)
            .then(token => {
                this.props.handleUserToken(username, token)
            })
            .catch(() => {
                this.setState({ falseAttempt: true })
            })
    }

}

Auth.propTypes = {
    handleUserToken: PropTypes.func.isRequired,
    token: PropTypes.string
};

export default Auth;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import './Auth.css';

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
                :
                <section className="authpage">
                    <form onSubmit={this.submitLogin} className="authForm">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" onChange={this.handleChange} value={username} required="required" />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" onChange={this.handleChange} value={password} required="required" />
                        <button>Log in</button>
                        {falseAttempt && <p>WRONG!!</p>}
                    </form>
                </section>
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
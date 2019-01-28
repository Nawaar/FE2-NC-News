import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api'
import { navigate } from '@reach/router';
import './TopicForm.css';

class TopicForm extends Component {
    state = {
        slug: '',
        description: '',
        err: null
    }
    render() {
        const { slug, description, err } = this.state
        return (
            <form onSubmit={this.postTopic} className="topicForm">
                <label htmlFor="slug">Slug:</label>
                <input id="slug" value={slug} type="text" onChange={this.handleChange} required="required" />
                <label htmlFor="description">Description:</label>
                <input id="description" value={description} type="text" onChange={this.handleChange} required="required" />
                <button>Add Topic</button>
                {err && <p>Sorry ... Something went wrong</p>}
            </form>
        );
    }

    handleChange = ({ target: { value, id } }) => {
        this.setState({
            [id]: value
        })
    }
    postTopic = (event) => {
        event.preventDefault();
        const { slug, description } = this.state
        api.postTopic(slug, description).then(topic => {
            this.props.addTopic(topic)
            navigate(`/topics/${topic.slug}`)
        }).catch(() => {
            this.setState({ err: true })
        })
    }
}

TopicForm.propTypes = {
    addTopic: PropTypes.func.isRequired
};

export default TopicForm;
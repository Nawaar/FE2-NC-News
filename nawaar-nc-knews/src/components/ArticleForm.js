import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api'
import { navigate } from '@reach/router';
import './ArticleForm.css';

class ArticleForm extends Component {
    state = {
        topic: '',
        title: '',
        body: '',
        err: null
    }
    render() {
        const { topics } = this.props
        const { title, body, err } = this.state
        return (
            <form onSubmit={this.postArticle} className="articleForm">
                <label htmlFor="topic">Topic:</label>
                <select id="topic" onChange={this.handleChange} required="required">
                    <option value=''>Choose topic</option>
                    {topics.map(({ slug }) => (
                        <option key={slug} value={slug}>{slug}</option>
                    ))}
                </select>
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" value={title} onChange={this.handleChange} required="required" />
                <label htmlFor="body">Body:</label>
                <textarea id="body" value={body} onChange={this.handleChange} required="required" rows="20" />
                <button>Submit</button>
                {err && <p>Sorry ... Something went wrong</p>}
            </form>
        );
    }
    handleChange = ({ target: { value, id } }) => {
        this.setState({
            [id]: value
        })
    }

    postArticle = (event) => {
        event.preventDefault();
        const { topic, title, body } = this.state
        const { currentUser: { user_id } } = this.props
        api.postArticle(topic, user_id, title, body).then(article => {
            navigate(`/article/${article.article_id}`)
        }).catch(() => {
            this.setState({ err: true })
        })
    }
}

ArticleForm.propTypes = {
    topics: PropTypes.array,
    currentUser: PropTypes.object
};

export default ArticleForm;
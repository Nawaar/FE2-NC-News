import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import * as api from '../api'
import { navigate } from '@reach/router';

class ArticleForm extends Component {
    state = {
        topic: '',
        title: '',
        body: ''
    }
    render() {
        const { topics } = this.props
        const { title, body } = this.state
        return (
            <form onSubmit={this.postArticle}>
                <label htmlFor="topic">Choose a Topic</label>
                <select id="topic" onChange={this.handleChange}>
                    <option value=''>Please select Topic</option>
                    {topics.map(({ slug }) => (
                        <option key={slug} value={slug}>{slug}</option>
                    ))}
                </select>
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" value={title} onChange={this.handleChange} />
                <label htmlFor="body">Body:</label>
                <textarea id="body" value={body} onChange={this.handleChange}>Enter your body ...</textarea>
                <button>Submit</button>
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
        })
    }
}

ArticleForm.propTypes = {

};

export default ArticleForm;
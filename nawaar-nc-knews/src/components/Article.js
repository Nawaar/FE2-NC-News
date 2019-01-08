import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import * as api from '../api';

class Article extends Component {
    state = {
        article: {},
        comments: []
    }
    render() {
        const { article: { body, title, author, topic, created_at }, comments } = this.state
        return (
            <div>
                <h2>{title}</h2>
                <h3>{topic}</h3>
                {author && <h4>{created_at.slice(0, 10)}</h4>}
                <h5>{body}</h5>
                <h6>{author}</h6>


                {comments.map(({ body, comment_id, created_at, author }) => (
                    <span key={comment_id}>
                        <p>{body}</p>
                        <p>{created_at.slice(0, 10)}</p>
                        <p>{author}</p>
                    </span>
                ))}

            </div >
        );
    }
    componentDidMount() {
        this.fetchArticle()
        this.fetchComments()
    }

    componentDidUpdate(prevProps, prevState) {
        const { article_id } = this.props;
        if (article_id !== prevProps.article_id) {
            this.fetchArticle()
            this.fetchComments()
        }
    }

    fetchArticle = () => {
        const { article_id } = this.props
        api.getArticle(article_id).then(article => {
            this.setState({
                article
            })
        })
    }

    fetchComments = () => {
        const { article_id } = this.props
        api.getComments(article_id).then(comments => {
            this.setState({
                comments
            })
        })
    }
}

Article.propTypes = {

};

export default Article;
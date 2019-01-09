import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import * as api from '../api';
import './Article.css';
import Votes from './Votes';
import CommentForm from './CommentForm';

class Article extends Component {
    state = {
        article: {},
        comments: []
    }
    render() {
        const { article: { body, title, author, topic, created_at, votes, article_id }, comments } = this.state
        return (

            <div className="ArticlePage">
                {article_id &&
                    <>
                        <h2>{title}</h2>
                        <h3>{topic}</h3>
                        {created_at && <h4>{created_at.slice(0, 10)}</h4>}
                        <h5>{body}</h5>
                        <h6>{author}</h6>
                        <Votes votes={votes} article_id={article_id} />
                    </>
                }

                <CommentForm addComment={this.addComment} />

                {comments.map(({ body, comment_id, created_at, author, votes }) => (
                    <span key={comment_id} className="comment">
                        <p>{body}</p>
                        <p>{created_at.slice(0, 10)}</p>
                        <p>{author}</p>
                        <Votes votes={votes} article_id={article_id} comment_id={comment_id} />
                    </span>
                ))}

            </div >
        );
    }

    addComment = (comment) => {
        const { article_id, currentUser: { user_id } } = this.props
        api.postComment(article_id, user_id, comment).then(newComment => {
            this.setState((state) => {
                return {
                    comments: [newComment, ...state.comments]
                }
            })
        })
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
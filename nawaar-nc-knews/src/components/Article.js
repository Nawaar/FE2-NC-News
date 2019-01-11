import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import './Article.css';
import Votes from './Votes';
import Err from './Err';
import CommentForm from './CommentForm';
import { Button } from 'react-bootstrap';
import { navigate } from '@reach/router';
import throttle from 'lodash.throttle';
import moment from 'moment';

class Article extends Component {
    state = {
        article: {},
        comments: [],
        page: 1,
        err: null
    }
    render() {
        const { article: { body, title, author, topic, created_at, votes, article_id }, comments, err } = this.state
        const { currentUser } = this.props;
        return (
            err
                ? <Err />
                : <div className="articlePage">
                    {article_id &&
                        <section className="articleContent">
                            <h5>{topic.toUpperCase()}・Posted by {author} {moment(created_at).startOf('day').fromNow()}</h5>
                            <h2>{title}</h2>
                            <span>
                                <p>{body}</p>
                                <Votes votes={votes} article_id={article_id} />
                            </span>
                            {author === currentUser.username && <Button onClick={this.deleteArticle} className="deleteButton">Delete Article</Button>}
                        </section>
                    }

                    <h4>COMMENTS</h4>

                    <CommentForm addComment={this.addComment} />

                    {
                        comments.map(({ body, comment_id, created_at, author, votes }) => (
                            <span key={comment_id} className="comment">
                                <section>
                                    <h6>{author} ・ {moment(created_at).startOf('day').fromNow()}</h6>
                                    {author === currentUser.username && <Button onClick={() => this.deleteComment(comment_id)} className="commentDelButton">Delete Comment</Button>}
                                </section>
                                <span>
                                    <p>{body}</p>
                                    <Votes votes={votes} article_id={article_id} comment_id={comment_id} />
                                </span>
                            </span>
                        ))
                    }

                </div >
        );
    }

    handleScroll = () => {
        const scrolledHeight = window.innerHeight + window.scrollY
        const bottom = document.body.scrollHeight - 100
        if (scrolledHeight >= bottom) {
            this.setState((state) => {
                return { page: state.page + 1 }
            }, this.fetchComments)
        }
    }

    throttledScroll = throttle(this.handleScroll, 2000)

    deleteComment = (comment_id) => {
        const { article_id } = this.props
        api.deleteComment(article_id, comment_id).then(() => {
            this.setState((state) => {
                return { comments: state.comments.filter(comments => comments.comment_id !== comment_id) }
            })
        })
    }

    deleteArticle = () => {
        const { article_id } = this.props
        api.deleteArticle(article_id).then(() => {
            navigate('/')
        })
    }

    addComment = (comment) => {
        const { article_id, currentUser: { user_id, username } } = this.props
        api.postComment(article_id, user_id, comment).then(newComment => {
            const newCommentLayout = { ...newComment, author: username }
            this.setState((state) => {
                return {
                    comments: [newCommentLayout, ...state.comments]
                }
            })
        })
    }

    componentDidMount() {
        this.fetchArticle()
        this.fetchComments()
        window.addEventListener('scroll', this.throttledScroll)
    }

    componentDidUpdate(prevProps, prevState) {
        const { article_id } = this.props;
        if (article_id !== prevProps.article_id) {
            this.fetchArticle()
            this.setState({ page: 1, comments: [] }, this.fetchComments)
            window.addEventListener('scroll', this.throttledScroll)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.throttledScroll)
    }

    fetchArticle = () => {
        const { article_id } = this.props
        api.getArticle(article_id).then(article => {
            this.setState({
                article
            })
        }).catch(() => {
            this.setState({ err: true })
        })
    }

    fetchComments = () => {
        const { article_id } = this.props
        const { page } = this.state
        api.getComments(article_id, page).then(comments => {
            this.setState((state) => {
                return { comments: [...state.comments, ...comments] }
            })
            if (comments.length < 10) {
                window.removeEventListener('scroll', this.throttledScroll)
            }
        }).catch(() => {
            window.removeEventListener('scroll', this.throttledScroll)
        })
    }
}

Article.propTypes = {
    currentUser: PropTypes.object
};

export default Article;
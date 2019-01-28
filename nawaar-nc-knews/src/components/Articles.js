import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { Link } from '@reach/router';
import './Articles.css';
import throttle from 'lodash.throttle';
import moment from 'moment';
import { navigate } from '@reach/router';

class Articles extends Component {
    state = {
        articles: [],
        page: 1,
        err: null
    }

    render() {
        const { articles, err } = this.state
        const { topic, topics } = this.props;
        return (
            err
                ?
                topics ? topics.find(aTopic => aTopic.slug === topic.toLowerCase())
                    ? <>
                        <p>Sorry, they are no articles under this topic. You can write one instead.</p>
                        <button className="navigateButton" onClick={() => this.handleClick('article')}>Write Article</button>
                    </>
                    : <>
                        <p>Sorry, topic does not exist. You can create one instead.</p>
                        <button className="navigateButton" onClick={() => this.handleClick('topic')}>Create Topic</button>
                    </>
                    : <>
                        <p>Sorry, they are no articles. You can write one instead.</p>
                        <button className="navigateButton" onClick={() => this.handleClick('article')}>Write Article</button>
                    </>
                : <>
                    {
                        articles.map(({ title, article_id, author, created_at, votes }) => (
                            <Link to={`/article/${article_id}`} key={article_id} className="article">
                                <hr></hr>
                                <h3>{title}</h3>
                                <h5>{author}・{moment(created_at).fromNow()}・votes: {votes}</h5>
                            </Link>
                        ))
                    }
                </>
        );
    }

    handleClick = (page) => {
        navigate(`/${page}/add`)
    }

    handleScroll = () => {
        const scrolledHeight = window.innerHeight + window.scrollY
        const bottom = document.body.scrollHeight - 100
        if (scrolledHeight >= bottom) {
            this.setState((state) => {
                return { page: state.page + 1 }
            }, this.fetchArticles)
        }
    }

    throttledScroll = throttle(this.handleScroll, 2000)

    componentDidMount() {
        this.fetchArticles()
        window.addEventListener('scroll', this.throttledScroll)
    }

    componentDidUpdate(prevProps, prevState) {
        const { topic } = this.props;
        if (topic !== prevProps.topic) {
            this.setState({ page: 1, articles: [], err: null }, this.fetchArticles)
            window.addEventListener('scroll', this.throttledScroll)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.throttledScroll)
    }

    fetchArticles = () => {
        const { topic } = this.props
        const { page } = this.state
        api
            .getArticles(topic, page)
            .then(articles => {
                this.setState((state) => {
                    return { articles: [...state.articles, ...articles] }
                })
                if (articles.length < 10) {
                    window.removeEventListener('scroll', this.throttledScroll)
                }
            })
            .catch(() => {
                window.removeEventListener('scroll', this.throttledScroll)
                if (!this.state.articles.length) {
                    this.setState({ err: true })
                }
            })
    }
}

Articles.propTypes = {
    topics: PropTypes.array
};

export default Articles;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { Link } from '@reach/router';
import './Articles.css';
import throttle from 'lodash.throttle';

class Articles extends Component {
    state = {
        articles: [],
        page: 1
    }

    render() {
        const { articles } = this.state
        return (
            <>
                {
                    articles.map(({ title, article_id, topic, author, created_at }) => (
                        <Link to={`/article/${article_id}`} key={article_id} className="article">
                            <h3>{title}</h3>
                            <h4>{author}</h4>
                            <h5>{created_at.slice(0, 10)}</h5>
                        </Link>
                    ))
                }
            </>
        );
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
            this.setState({ page: 1, articles: [] }, this.fetchArticles)
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
            })
    }
}

Articles.propTypes = {
    topic: PropTypes.string
};

export default Articles;
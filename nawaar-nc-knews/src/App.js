import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Router } from '@reach/router';
import Article from './components/Article';
import * as api from './api';
import Auth from './components/Auth';
import ArticleForm from './components/ArticleForm';

class App extends Component {
  state = {
    topics: []
  }
  render() {
    const { topics, token, currentUser } = this.state
    return (
      <div className="App">
        <Header currentUser={currentUser} />
        <Auth handleUserToken={this.handleUserToken} token={token}>
          <Nav topics={topics} />
          <Router className="main">
            <Articles path='/' />
            <Articles path='/topics/:topic' />
            <Article path='/article/:article_id' currentUser={currentUser} />
            <ArticleForm path='/article/add' topics={topics} currentUser={currentUser} />
          </Router>
        </Auth>
      </div>
    );
  }

  componentDidMount() {
    if (localStorage.AUTH_TOKEN && localStorage.currentUser) {
      this.setState({
        token: localStorage.AUTH_TOKEN,
        currentUser: localStorage.currentUser
      }, () => {
        this.fetchTopics()
      })
    }
  }

  handleUserToken = (username, token) => {
    localStorage.setItem('AUTH_TOKEN', token)
    this.setState({ token }, () => {
      this.fetchTopics()
      this.fetchCurrentUser(username)
    })
  }

  fetchCurrentUser = (username) => {
    api.getUsers().then(users => {
      this.setState({
        currentUser: users.find(user => user.username === username)
      })
    })
  }

  fetchTopics = () => {
    api.getTopics().then(topics => {
      this.setState({
        topics
      })
    })
  }

}

export default App;

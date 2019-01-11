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
import TopicForm from './components/TopicForm';
import Err from './components/Err';

class App extends Component {
  state = {
    topics: [],
    access: true
  }
  render() {
    const { topics, token, currentUser, access } = this.state
    return (
      <div className="App">
        <Header currentUser={currentUser} />
        <Auth handleUserToken={this.handleUserToken} token={token}>
          {access &&
            <>
              <Nav topics={topics} />
              <Router className="main">
                <Articles path='/' />
                <Articles path='/topics/:topic' topics={topics} />
                <Article path='/article/:article_id' currentUser={currentUser} />
                <ArticleForm path='/article/add' topics={topics} currentUser={currentUser} />
                <TopicForm path='topic/add' addTopic={this.addTopic} />
                <Err default />
              </Router>
            </>
          }
          {!access && <p>Sorry ... Something went wrong from our server ... Try again later</p>}
        </Auth>
      </div>
    );
  }

  addTopic = (topic) => {
    this.setState((state) => {
      return { topics: [...state.topics, topic] }
    })
  }

  componentDidMount() {
    if (localStorage.AUTH_TOKEN
      && localStorage.currentUser
    ) {
      this.setState({
        token: localStorage.AUTH_TOKEN,
        currentUser: JSON.parse(localStorage.currentUser)
      }, () => {
        this.fetchTopics()
      })
    }
  }

  handleUserToken = (username, token) => {
    localStorage.setItem('AUTH_TOKEN', token)
    api.setAuthorizationHeader(token)
    this.setState({ token }, () => {
      this.fetchTopics()
      this.fetchCurrentUser(username)
    })
  }

  fetchCurrentUser = (username) => {
    api.getUsers().then(users => {
      const currentUser = users.find(user => user.username === username)
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
      this.setState({
        currentUser
      })
    }).catch(() => {
      this.setState({
        access: false
      })
    })
  }

  fetchTopics = () => {
    api.getTopics().then(topics => {
      this.setState({
        topics
      })
    }).catch(() => {
      this.setState({
        access: false
      })
    })
  }

}

export default App;

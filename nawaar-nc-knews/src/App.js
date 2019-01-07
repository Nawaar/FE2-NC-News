import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Router } from '@reach/router';
import Article from './components/Article';
import * as api from './api';

class App extends Component {
  state = {
    topics: []
  }
  render() {
    const { topics } = this.state
    return (
      <div className="App">
        <Header />
        <Nav topics={topics} />
        <Router className="main">
          <Articles path='/' />
          <Articles path='/topics/:topic' />
          <Article path='/article/:article_id' />
        </Router>

      </div>
    );
  }

  componentDidMount() {
    this.fetchTopics()
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

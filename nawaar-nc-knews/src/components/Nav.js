import React, { Component } from 'react';
import './Nav.css';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

class Nav extends Component {
  render() {
    const { topics, handleNav } = this.props
    return (
      <nav>
        <section>
          <hr></hr>
          <Link to='/' className="endpoints" getProps={this.isCurrentLink} onClick={handleNav}>Home</Link>
          <hr></hr>
          <Link to='/topic/add' className="endpoints" getProps={this.isCurrentLink} onClick={handleNav}>Add a Topic</Link>
          <Link to='/article/add' className="endpoints" getProps={this.isCurrentLink} onClick={handleNav}>Add an Article</Link>
          <hr></hr>
          <h4>TOPICS</h4>
          {topics.map(({ slug }) => <Link key={slug} to={`/topics/${slug}`} className="endpoints" getProps={this.isCurrentLink} onClick={handleNav}>{slug}</Link>)}
          <hr></hr>
          <button onClick={this.logout} className="endpoints" >Logout</button>
          <hr></hr>
        </section>
      </nav>
    );
  }

  logout = () => {
    const { handleNav } = this.props;
    localStorage.clear()
    handleNav()
    window.location.reload()
  }

  isCurrentLink = ({ isCurrent }) => {
    return {
      style: {
        backgroundColor: isCurrent ? 'rgb(242,242,242)' : 'white'
      }
    }
  }


}

Nav.propTypes = {
  topics: PropTypes.array.isRequired
};

export default Nav;

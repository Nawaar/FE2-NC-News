import React, { Component } from 'react';
import './Nav.css';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

class Nav extends Component {
  render() {
    const { topics } = this.props
    return (
      <nav>
        <hr></hr>
        <Link to='/' className="endpoints" getProps={this.isCurrentLink}>Home</Link>
        <hr></hr>
        <Link to='/topic/add' className="endpoints" getProps={this.isCurrentLink}>Topic Adder</Link>
        <Link to='/article/add' className="endpoints" getProps={this.isCurrentLink}>Article Adder</Link>
        <hr></hr>
        <h4>TOPICS</h4>
        {topics.map(({ slug }) => <Link key={slug} to={`/topics/${slug}`} className="endpoints" getProps={this.isCurrentLink}>{slug}</Link>)}
        <hr></hr>
      </nav>
    );
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

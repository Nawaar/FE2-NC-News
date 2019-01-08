import React from 'react';
import './Nav.css';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

const Nav = ({ topics }) => {
  return (
    <nav>
      <Link to='/' className="topic-endpoints">home</Link>
      {topics.map(({ slug }) => <Link key={slug} to={`/topics/${slug}`} className="topic-endpoints">{slug}</Link>)}
    </nav>
  );
};

Nav.propTypes = {
  topics: PropTypes.array.isRequired
};

export default Nav;
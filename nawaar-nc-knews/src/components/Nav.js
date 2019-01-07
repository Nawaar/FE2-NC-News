import React from 'react';
import './Nav.css';
import { Link } from '@reach/router';

const Nav = ({ topics }) => {
  return (
    <nav>
      {topics.map(({ slug }) => <Link key={slug} to={`/topics/${slug}`} >{slug}</Link>)}
    </nav>
  );
};

export default Nav;
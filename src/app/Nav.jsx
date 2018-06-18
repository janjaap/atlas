import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="nav">
    <div className="nav__container">
      <Link className="nav__link" to="/" href="/">Home</Link>
      <Link className="nav__link" to="/map" href="/map">Map</Link>
    </div>
  </div>
);


export default Nav;

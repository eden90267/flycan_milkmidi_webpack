import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <div className="navigation_root">
    <ul>
      <li><NavLink to="/" exact>Home</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
    </ul>
  </div>
);

export default Navigation;

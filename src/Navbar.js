import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './assets/logo.png';




const Navbar = () => {
  return (
    <nav>
      
       <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo" />
        <span className="company-name">SSC 2023</span>
      </div>

    <div className="navbar-menu">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/solar">Solarcell</Link></li>
        <li><Link to="/cctv">CCTV</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/about">Support</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;

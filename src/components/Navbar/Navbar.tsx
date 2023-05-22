import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
return (
  <div className="navbar-container">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
  </div>
  )
}

export default Navbar;
import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar (): JSX.Element {
  return (
    <div className="navbar-container">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  )
}

export default Navbar

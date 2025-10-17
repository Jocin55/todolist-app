import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';  // Import the existing CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Todo-App</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/view">My Tasks</a></li>
        <li><a href="/add">Add Tasks</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
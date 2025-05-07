// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/create-event">Create Event</Link>
            <Link to="/events">Events</Link>
        </nav>
    );
};

export default Navbar;

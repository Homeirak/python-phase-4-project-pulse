//navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Pulse</h1>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/exercise">Exercises</Link>
                </li>
                <li>
                    <Link to="/workouts">Workouts</Link>
                </li>
                {/* Uncomment for testing if needed
                <li>
                    <Link to="/workouts/1">Workout 1 Details</Link>
                </li>
                */}
            </ul>
        </nav>
    );
}

export default NavBar;
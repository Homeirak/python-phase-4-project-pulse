// will contain the navbars for all three 
// put header component inside navbar if you want (see pic)

import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
            <h1>Pulse</h1>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/exercise">Exercises</Link>
                </li>
                <li>
                    <Link to="/workouts">Workouts</Link>
                </li>
                {/* For testing the details page */}
                {/* <li>
                    <Link to="/workouts/1">Workout 1 Details</Link>
                </li> */}
            </ul>
        </nav>
    );
}

export default NavBar;

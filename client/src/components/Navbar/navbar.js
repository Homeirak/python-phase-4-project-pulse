// will contain the navbars for all three 
// put header component inside navbar if you want (see pic)

import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/exercise">Exercises</Link>
                </li>
                <li>
                    <Link to="/workouts">Workouts</Link>
                </li>
                <li>
                    <Link to="/newexerciseform">+ New Exercise</Link>
                </li>
                <li>
                    <Link to="/newworkoutform">+ New Workout</Link>
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

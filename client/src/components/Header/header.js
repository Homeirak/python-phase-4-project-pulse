// header.js
import React from "react";
import { useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case "/home":
                return "Welcome Home";
            case "/exercise":
                return "Exercises";
            case "/workouts":
                return "Workouts";
            case "/newexerciseform":
                return "Create New Exercise";
            case "/newworkoutform":
                return "Create New Workout";
            default:
                return "Fitness App";
        }
    };

    return (
        <header className="page-header">
            <h1>{getTitle()}</h1>
        </header>
    );
}

export default Header;

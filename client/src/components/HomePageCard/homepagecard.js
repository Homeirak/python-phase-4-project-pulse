// homepagecard.js
import React from "react";
import { Link } from "react-router-dom";

function HomePageCard({ workout }) {
    // Format the date as MM-DD-YY
    const dateObj = new Date(workout.date);
    const formattedDate = `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}-${dateObj.getFullYear().toString().slice(-2)}`;

    return (
        <Link to={`/workouts/${workout.id}`} className="home-page-card-link">
            <div className="home-page-card">
                <h4 className="home-page-card-title">{workout.name}</h4>
                <p>Date: {formattedDate}</p>
                <p>
                    Exercises Logged: {workout.exercise_logs ? workout.exercise_logs.length : 0}
                </p>
            </div>
        </Link>
    );
}

export default HomePageCard;

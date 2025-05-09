// homepagecard.js
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from '../../utils/format-date-MM-DD-YY';

function HomePageCard({ workout }) {
    return (
        <Link to={`/workouts/${workout.id}`} className="home-page-card-link">
            <div className="home-page-card">
                <h4 className="home-page-card-title">{workout.name}</h4>
                <p>Date: {formatDate(workout.date)}</p>
                <p>
                    Exercises Logged: {workout.exercise_logs ? workout.exercise_logs.length : 0}
                </p>
            </div>
        </Link>
    );
}

export default HomePageCard;

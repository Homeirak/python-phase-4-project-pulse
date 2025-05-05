// workoutpage.js
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import CreateNewButton from "./CreateNewButton";
import WorkoutCard from "./WorkoutCard";

function WorkoutPage() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5555/workoutsessions")

            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Data in Workouts:", data);
                setWorkouts(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="workout-page">
            <NavBar />
            <Header />
            <CreateNewButton to="/newworkoutform" label="Create New Workout" />
            <div className="workout-card-list">
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </div>
    );
}

export default WorkoutPage;

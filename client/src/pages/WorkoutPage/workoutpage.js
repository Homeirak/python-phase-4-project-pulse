// workoutpage.js
import React, { useEffect, useState } from "react";
import CreateNewButton from "../../components/CreateNewButton/createnewbutton";
import WorkoutCard from "../../components/WorkoutCard/workoutcard";
import './workoutpage.css'

function WorkoutPage() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/workoutsessions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data in Workouts:", data);
       
        setWorkouts(Array.isArray(data) ? data : (data.workouts || []));
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="workout-page">
        {/*Button wrapper for easier positioning */}
        <div className="button-container center">
        <CreateNewButton to="/newworkoutform" label="Create New Workout" />
        </div>
      <div className="workout-card-list">
        {Array.isArray(workouts) && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))
        ) : (
          <p>No workouts available.</p>
        )}
      </div>
    </div>
  );
}

export default WorkoutPage;
// exercisepage.js
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import DropdownFilter from "./DropdownFilter";
import CreateNewButton from "./CreateNewButton";
import ExerciseCard from "./ExerciseCard";

function ExercisePage() {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5555/exercises")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Data in Exercises:", data);
                setExercises(data);
                setFilteredExercises(data); // start with all shown
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="exercise-page">
            <NavBar />
            <Header />
            <DropdownFilter
                exercises={exercises}
                setFilteredExercises={setFilteredExercises}
        />
            <CreateNewButton to="/newexerciseform" label="Create New Exercise" />

<div className="exercise-card-list">
    {filteredExercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
    ))}
</div>
</div>
);
}

export default ExercisePage;
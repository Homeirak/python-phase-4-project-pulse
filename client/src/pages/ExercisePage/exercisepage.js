// exercisepage.js
import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/navbar";
import Header from "../../components/Header/header";
import DropdownFilter from "../../components/DropDownFilter/dropdownfilter";
import CreateNewButton from "../../components/CreateNewButton/createnewbutton";
import ExerciseCard from "../../components/ExerciseCard/exercisecard";

function ExercisePage() {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5555/exercises")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Data in Exercises:", data);
    
                if (Array.isArray(data)) {
                    setExercises(data);
                    setFilteredExercises(data); // start with all shown
                } else {
                    console.error("Expected an array but got:", data);
                    setExercises([]); // fallback to empty array
                    setFilteredExercises([]);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);
    
    return (
        <div className="exercise-page">
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
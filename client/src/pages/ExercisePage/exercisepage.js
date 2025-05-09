// exercisepage.js
import React, { useEffect, useState } from "react";
import DropdownFilter from "../../components/DropDownFilter/dropdownfilter";
import CreateNewButton from "../../components/CreateNewButton/createnewbutton";
import ExerciseCard from "../../components/ExerciseCard/exercisecard";
import './exercisepage.css'


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
                    setFilteredExercises(data); // Start with all exercises shown
                } else {
                    console.error("Expected an array but got:", data);
                    setExercises([]);
                    setFilteredExercises([]);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);


    const handleExerciseUpdate = (updatedExercise) => {
        const updatedList = exercises.map((ex) =>
            ex.id === updatedExercise.id ? updatedExercise : ex
        );
        setExercises(updatedList);
        setFilteredExercises(updatedList);
    };


    const handleExerciseDelete = (deletedId) => {
        const updatedList = exercises.filter((ex) => ex.id !== deletedId);
        setExercises(updatedList);
        setFilteredExercises(updatedList);
    };


    return (
        <div className="exercise-page">
            <DropdownFilter
                exercises={exercises}
                setFilteredExercises={setFilteredExercises}
            />
            <div className="create-new-button-container">
                <CreateNewButton to="/newexerciseform" label="Create New Exercise" />
            </div>
            <div className="exercise-card-list">
                {filteredExercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        onUpdate={handleExerciseUpdate}
                        onDelete={handleExerciseDelete}
                    />
                ))}
            </div>
        </div>
    );
}


export default ExercisePage;

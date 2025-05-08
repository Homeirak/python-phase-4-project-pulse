// newexerciselogform.js
import React, { useState, useEffect } from "react";

function NewExerciseLogForm({ workoutId, onAddLog }) {
    const [formData, setFormData] = useState({
        exercise_id: "",
        reps: "",
        sets: "",
        weight: "",
        time: "",
    });

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5555/exercises")
            .then((res) => res.json())
            .then((data) => setExercises(data))
            .catch((error) => console.error("Error fetching exercises:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLog = {
            workout_session_id: workoutId,
            exercise_id: formData.exercise_id,
            reps: formData.reps,
            sets: formData.sets,
            weight: formData.weight,
            time: formData.time,
        };

        fetch("http://localhost:5555/exerciselogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newLog),
        })
            .then((res) => res.json())
            .then((createdLog) => {
                onAddLog(createdLog);
                setFormData({
                    exercise_id: "",
                    reps: "",
                    sets: "",
                    weight: "",
                    time: "",
                });
            })
            .catch((error) => console.error("Error creating exercise log:", error));
    };

    return (
        <form className="new-exercise-log-form" onSubmit={handleSubmit}>
            <select
                name="exercise_id"
                value={formData.exercise_id}
                onChange={handleChange}
                required
            >
                <option value="">Select Exercise</option>
                {exercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                        {exercise.name}
                    </option>
                ))}
            </select>

            <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                placeholder="Reps"
            />
            <input
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                placeholder="Sets"
            />
            <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight"
            />
            <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="Time (e.g., 30 mins)"
            />

            <button type="submit">Add Exercise Log</button>
        </form>
    );
}

export default NewExerciseLogForm;

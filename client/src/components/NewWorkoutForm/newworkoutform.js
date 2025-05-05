// newworkoutform.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewWorkoutForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        date: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5555/workouts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then(() => {
                //go back to workouts page after submit
                navigate("/workouts"); 
            })
            .catch((error) => console.error("Error creating workout:", error));
    };

    const handleCancel = () => {
        //on cancel, go back without saving
        navigate("/workouts"); 
    };

    return (
        <div className="new-workout-form">
            <h2>Create New Workout</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Workout Name"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default NewWorkoutForm;

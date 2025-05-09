// newworkoutform.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './newworkoutform.css'; // Link to the CSS file

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
        fetch("http://localhost:5555/workoutsessions", {
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
        navigate("/workouts");
    };

    return (
        <div className="new-workout-form">
            <h2>Create New Workout</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Workout Name</label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter workout name"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewWorkoutForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewExerciseForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        muscle_group: "",
        equipment: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5555/exercises", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then(() => {
                navigate("/exercise"); // ✅ Navigate back after submit
            })
            .catch((error) => console.error("Error creating exercise:", error));
    };

    const handleCancel = () => {
        navigate("/exercise"); // ✅ Navigate back on cancel
    };

    return (
        <div className="new-exercise-form">
            <h2>Create New Exercise</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category (e.g., strength, cardio)"
                    required
                />
                <input
                    name="muscle_group"
                    value={formData.muscle_group}
                    onChange={handleChange}
                    placeholder="Muscle Group (e.g., chest, back)"
                    required
                />
                <input
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleChange}
                    placeholder="Equipment (e.g., dumbbell, barbell)"
                    required
                />
                <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default NewExerciseForm;

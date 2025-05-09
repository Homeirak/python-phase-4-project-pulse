// dropdownfilter.js
import React, { useState, useEffect } from "react";
import './dropdownfilter.css'

const DropdownFilter = ({ exercises, setFilteredExercises }) => {
    const [muscleGroupFilter, setMuscleGroupFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const applyFilters = () => {
        if (!Array.isArray(exercises)) {
            console.error("Exercises data is not an array:", exercises);
            setFilteredExercises([]);
            return;
        }

        let filtered = [...exercises];

        if (muscleGroupFilter !== "") {
            filtered = filtered.filter((exercise) =>
                exercise.muscle_group.toLowerCase() === muscleGroupFilter.toLowerCase()
            );
        }
        if (categoryFilter !== "") {
            filtered = filtered.filter((exercise) =>
                exercise.category.toLowerCase() === categoryFilter.toLowerCase()
            );
        }

        setFilteredExercises(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [muscleGroupFilter, categoryFilter, exercises]);

    const handleMuscleGroupChange = (e) => setMuscleGroupFilter(e.target.value);
    const handleCategoryChange = (e) => setCategoryFilter(e.target.value);

    return (
        <div className="filter-container">
            <select className="filter-dropdown" value={muscleGroupFilter} onChange={handleMuscleGroupChange}>
                <option value="">Muscle Group</option>
                <option value="chest">Chest</option>
                <option value="back">Back</option>
                <option value="legs">Legs</option>
                <option value="arms">Arms</option>
                <option value="shoulders">Shoulders</option>
                <option value="full body">Full Body</option>
                {/* Add more as needed */}
            </select>

            <select className="filter-dropdown" value={categoryFilter} onChange={handleCategoryChange}>
                <option value="">Category</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="yoga">Yoga</option>
                <option value="HIIT">High-Intensity Interval Training (HIIT)</option>
                <option value="balance and stability">Balance and Stability</option>
            </select>
        </div>
    );
};

export default DropdownFilter;

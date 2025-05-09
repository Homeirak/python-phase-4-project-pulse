// exercisecard.js
import React, { useState } from "react";
import { Pencil, Trash2 } from 'lucide-react'
import './exercisecard.css'

function ExerciseCard({ exercise, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(exercise.name);
    const [editDescription, setEditDescription] = useState(exercise.description);
    const [editMuscleGroup, setEditMuscleGroup] = useState(exercise.muscle_group);
    const [editEquipment, setEditEquipment] = useState(exercise.equipment);
    const [editCategory, setEditCategory] = useState(exercise.category);

    const handleDelete = () => {
        fetch(`http://localhost:5555/exercises/${exercise.id}`, {
            method: "DELETE",
        })
            .then(() => onDelete(exercise.id))
            .catch((error) => console.error("Error deleting exercise:", error));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5555/exercises/${exercise.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: editName,
                description: editDescription,
                muscle_group: editMuscleGroup,
                equipment: editEquipment,
                category: editCategory,
            }),
        })
            .then((res) => res.json())
            .then((updatedExercise) => {
                onUpdate(updatedExercise);
                setIsEditing(false);
            })
            .catch((error) => console.error("Error updating exercise:", error));
    };

    return (
        <div className="exercise-card">
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        placeholder="Category"
                        required
                    />
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Exercise Name"
                        required
                    />
                    <input
                        type="text"
                        value={editMuscleGroup}
                        onChange={(e) => setEditMuscleGroup(e.target.value)}
                        placeholder="Muscle Group"
                        required
                    />
                    <input
                        type="text"
                        value={editEquipment}
                        onChange={(e) => setEditEquipment(e.target.value)}
                        placeholder="Equipment"
                        required
                    />
                    <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
                <>
                    <ul className="exercise-details">
                        <li className="exercise-name">{exercise.name}</li>
                        <li><strong>Category:</strong> {exercise.category}</li>
                        <li><strong>Muscle Group:</strong> {exercise.muscle_group}</li>
                        <li><strong>Equipment:</strong> {exercise.equipment}</li>
                        <li><strong>Description:</strong> {exercise.description}</li>
                    </ul>

                    <div className="card-actions">
                        <button onClick={() => setIsEditing(true)}>
                            <Pencil size={14.5}></Pencil>
                        </button>
                        <button onClick={handleDelete}>
                            <Trash2 size={14.5}></Trash2>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ExerciseCard;

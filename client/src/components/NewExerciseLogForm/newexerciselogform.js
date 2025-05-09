// newexerciselogform.js
import React, { useEffect, useState } from "react";
import './newexerciselogform.css'

function NewExerciseLogForm({ workoutId, onAddLog }) {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    // added sets and time
    exercise_id: "",
    reps: "",
    sets: "",
    weight: "",
    time: "",
  });

  // normalize whatever shape your API returns
  const normalizeExercises = (d) => {
    if (Array.isArray(d)) return d;
    if (d && Array.isArray(d.exercises)) return d.exercises;
    return [];
  };

  // fetch exercises for the dropdown
  useEffect(() => {
    fetch("http://localhost:5555/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(normalizeExercises(data)))
      .catch((err) => console.error("Error fetching exercises:", err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onAddLog !== "function") {
      console.error("onAddLog prop is not a function!");
      return;
    }

    // build payload with workout_session_id
    const payload = {
      ...formData,
      workout_session_id: workoutId,
    };

    fetch("http://localhost:5555/exerciselogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create exercise log");
        return res.json();
      })
      .then((newLog) => {
        onAddLog(newLog);
        // clear form
        setFormData({ exercise_id: "", reps: "", sets: "", weight: "", time: "", });
      })
      .catch((err) => console.error("Error creating log:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Exercise:
        <select
          name="exercise_id"
          value={formData.exercise_id}
          onChange={handleChange}
          required
        >
          <option value="">— Select —</option>
          {exercises.length > 0 ? (
            exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))
          ) : (
            <option disabled>No exercises available</option>
          )}
        </select>
      </label>

      {/* added sets and time */}
      <label>
           Sets:
        <input
          type="number"
          name="sets"
          value={formData.sets}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Reps:
        <input
          type="number"
          name="reps"
          value={formData.reps}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Weight:
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </label>

      <label>
          Time:
          <input
            type="number"
            name="time"  // fixed here
            value={formData.time}
            onChange={handleChange}
            required
          />
      </label>

      <button type="submit">Log Exercise</button>
    </form>
  );
}

export default NewExerciseLogForm;
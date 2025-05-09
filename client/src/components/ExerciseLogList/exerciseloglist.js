// exerciseloglist.js
import React from "react";
import './exerciseloglist.css'


function ExerciseLogList({ logs }) {
    return (
        <div className="exercise-log-list">
            {logs.length === 0 ? (
                <p>No exercises logged yet.</p>
            ) : (
                <ul>
                    {logs.map((log) => (
                        <li key={log.id} className="exercise-log-item">
                            <h4>{log.exercise ? log.exercise.name : "Unnamed Exercise"}</h4>
                            <p>Sets: {log.sets}</p>
                            <p>Reps: {log.reps}</p>
                            <p>Weight: {log.weight}</p>
                            <p>Time: {log.time}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


export default ExerciseLogList;

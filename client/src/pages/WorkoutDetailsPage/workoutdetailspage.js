// workoutdetailspage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseLogList from "../../components/ExerciseLogList/exerciseloglist";
import NewExerciseLogForm from "../../components/NewExerciseLogForm/newexerciselogform";
import './workoutdetailspage.css'
import ExerciseCard from "../../components/ExerciseCard/exercisecard";
import { formatDate } from '../../utils/format-date-MM-DD-YY';

function WorkoutDetailPage() {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [exerciseLogs, setExerciseLogs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5555/workoutsessions/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setWorkout(data);
                setExerciseLogs(data.exercise_logs || []);
            })
            .catch((error) => console.error("Error fetching workout details:", error));
    }, [id]);

    const handleAddLog = (newLog) => {
        setExerciseLogs((prevLogs) => [...prevLogs, newLog]);
    };

    return (
        <div className="workout-detail-page">
            {workout ? (
                <div>
                    <h2>{workout.name}</h2>
                    <p>Date: {formatDate(workout.date)}</p>

                    <h3>Exercise Logs</h3>
                   
                    <ExerciseLogList logs={exerciseLogs} />

                    <h3>Add New Exercise Log</h3>
                    <NewExerciseLogForm workoutId={id} onAddLog={handleAddLog} />
                </div>
            ) : (
                <p>Loading workout details...</p>
            )}
        </div>
    );
}

export default WorkoutDetailPage;
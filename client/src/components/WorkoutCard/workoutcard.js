// workoutcard.js
import { Link } from "react-router-dom";

function WorkoutCard({ workout }) {
    return (
        <Link to={`/workouts/${workout.id}`}>
            <div className="workout-card">
                <h3>{workout.name}</h3>
                <p>Date: {workout.date}</p>
            </div>
        </Link>
    );
}
export default WorkoutCard;
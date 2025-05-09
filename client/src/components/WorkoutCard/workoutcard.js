// workoutcard.js
import { Link } from "react-router-dom";
import './workoutcard.css'
import { formatDate } from '../../utils/format-date-MM-DD-YY';

function WorkoutCard({ workout }) {
    return (
        <Link to={`/workouts/${workout.id}`}>
            <div className="workout-card">
                <h3>{workout.name}</h3>
                <p>Date: {formatDate(workout.date)}</p>
            </div>
        </Link>
    );
}
export default WorkoutCard;
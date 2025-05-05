//app.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";
import HomePage from "./HomePage";
import ExercisePage from "./ExercisePage";
import WorkoutPage from "./WorkoutPage";
import NewExerciseForm from "./NewExerciseForm";
import NewWorkoutForm from "./NewWorkoutForm";
import WorkoutDetailPage from "./WorkoutDetailPage";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/home" element={<><Header title="Home" /><HomePage /></>} />
                    <Route path="/exercise" element={<><Header title="Exercises" /><ExercisePage /></>} />
                    <Route path="/workouts" element={<><Header title="Workouts" /><WorkoutPage /></>} />
                    <Route path="/newexerciseform" element={<><Header title="Create New Exercise" /><NewExerciseForm /></>} />
                    <Route path="/newworkoutform" element={<><Header title="Create New Workout" /><NewWorkoutForm /></>} />
                    <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

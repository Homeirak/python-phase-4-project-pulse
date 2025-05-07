//app.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import Header from "./Header/header";
import HomePage from "../pages/HomePage/homepage";
import ExercisePage from "../pages/ExercisePage/exercisepage";
import WorkoutPage from "../pages/WorkoutPage/workoutpage";
import NewExerciseForm from "../pages/NewExerciseFormPage/newexerciseformpage";
import NewWorkoutForm from "../pages/NewWorkoutFormPage/newworkoutformpage";
import WorkoutDetailPage from "../pages/WorkoutDetailsPage/workoutdetailspage";


function App() {
    return (
        <Router>
            <div className="layout"> {/* ✅ global layout */}
                <NavBar />
                <div className="main-content"> {/* right side: Header + Routes */}
                    <Routes>
                        <Route path="/" element={<><Header title="Welcome Home" /><HomePage /></>} />
                        <Route path="/exercise" element={<><Header title="Exercises" /><ExercisePage /></>} />
                        <Route path="/workouts" element={<><Header title="Workouts" /><WorkoutPage /></>} />
                        <Route path="/newexerciseform" element={<><Header title="Create New Exercise" /><NewExerciseForm /></>} />
                        <Route path="/newworkoutform" element={<><Header title="Create New Workout" /><NewWorkoutForm /></>} />
                        <Route path="/workouts/:id" element={<><Header title="Workout Details" /><WorkoutDetailPage /></>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

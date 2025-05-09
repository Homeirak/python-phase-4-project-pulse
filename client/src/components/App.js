//app.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import Header from "./Header/header";
import HomePage from "../pages/HomePage/homepage";
import ExercisePage from "../pages/ExercisePage/exercisepage";
import WorkoutPage from "../pages/WorkoutPage/workoutpage";
import NewExerciseForm from "../pages/NewExerciseFormPage/newexerciseformpage";
import NewWorkoutForm from "../pages/NewWorkoutFormPage/newworkoutformpage";
import WorkoutDetailPage from "../pages/WorkoutDetailsPage/workoutdetailspage";
import './App.css';

function App() {
    return (
        <Router>
            <div className="layout">
                <NavBar />
                <div className="main-content">
                    <DynamicHeader /> {/* ✅ NEW: renders the right title */}
                    <div className="page-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/exercise" element={<ExercisePage />} />
                            <Route path="/workouts" element={<WorkoutPage />} />
                            <Route path="/newexerciseform" element={<NewExerciseForm />} />
                            <Route path="/newworkoutform" element={<NewWorkoutForm />} />
                            <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

// ✅ NEW: helper component to set the title dynamically
function DynamicHeader() {
    const location = useLocation();

    let title = '';
    if (location.pathname === '/') {
        title = 'Dashboard';
    } else if (location.pathname.startsWith('/exercise')) {
        title = 'Exercises';
    } else if (location.pathname.startsWith('/workouts/') && location.pathname !== '/workouts') {
        title = 'Workout Details';
    } else if (location.pathname === '/workouts') {
        title = 'Workouts';
    } else if (location.pathname === '/newexerciseform') {
        title = 'Create New Exercise';
    } else if (location.pathname === '/newworkoutform') {
        title = 'Create New Workout';
    } else {
        title = '';  // default blank if needed
    }

    return <Header title={title} />;
}

export default App;

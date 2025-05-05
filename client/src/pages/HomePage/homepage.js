// homepage.js
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import HomePageCard from "./HomePageCard"; 
import CardTitle from "./CardTitle";        
import SubHeader from "./SubHeaderForHomePage";        

function HomePage() {
    const [mostPopularWorkout, setMostPopularWorkout] = useState(null);
    const [mostRecentWorkout, setMostRecentWorkout] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5555/workoutsessions")
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0) {
                    const mostRecent = data.reduce((latest, w) =>
                        new Date(w.date) > new Date(latest.date) ? w : latest
                    );

                    const mostPopular = data.reduce((top, w) =>
                        (w.exercise_logs?.length || 0) > (top.exercise_logs?.length || 0) ? w : top
                    );

                    setMostRecentWorkout(mostRecent);
                    setMostPopularWorkout(mostPopular);
                }
            })
            .catch((error) => console.error("Error fetching workouts:", error));
    }, []);

    return (
        <div className="home-page">
            <NavBar />
            <Header title="Home" />

            <SubHeader title="Your Workouts" /> 

            <div className="home-sections">
                <div className="most-popular-section">
                    <CardTitle title="Most Popular" /> 
                    {mostPopularWorkout ? (
                        <HomePageCard workout={mostPopularWorkout} />
                    ) : (
                        <p>No popular workout found.</p>
                    )}
                </div>

                <div className="most-recent-section">
                    <CardTitle title="Most Recent" /> 
                    {mostRecentWorkout ? (
                        <HomePageCard workout={mostRecentWorkout} /> 
                    ) : (
                        <p>No recent workout found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;

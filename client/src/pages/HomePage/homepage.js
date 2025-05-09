// homepage.js
import React, { useEffect, useState } from "react";
import HomePageCard from "../../components/HomePageCard/homepagecard";
import HomePageCardTitle from "../../components/HomePageCardTitle/homepagecardtitle";
import SubHeader from "../../components/SubHeaderForHomepage/subheaderforhomepage";

// CSS Imports
import '../../components/HomePageCard/homepagecard.css';
import '../../components/HomePageCardTitle/homepagecardtitle.css';
import './homepage.css';

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
            <SubHeader className="your-workouts" title="Your Workouts" />
            <div className="home-sections">
                <div className="most-popular-section">
                    <HomePageCardTitle title="Most Popular" />
                    {mostPopularWorkout ? (
                        <HomePageCard className="popular-card" workout={mostPopularWorkout} />
                    ) : (
                        <p>No popular workout found.</p>
                    )}
                </div>

                <div className="most-recent-section">
                    <HomePageCardTitle title="Most Recent" />
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
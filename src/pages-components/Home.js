import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div id="home-div">
            <h1 className="home-title">Path Mind: Your Learning, Your Way</h1>
            <p>Unveil a universe of learning possibilities, tailored just for you.</p>
            
            <section id="intro-video">
                <h2>What is Path Mind?</h2>
                <video src="intro.mp4" controls></video>
                <p>Watch the video to find out how Path Mind can supercharge your learning!</p>
            </section>
            
            <div id="home-bottom-div">
                <section id="journey-start">
                    <h2>Embark on Your Learning Journey</h2>
                    <p>Sign-up and start !</p>
                    <Link to="/signup">
                        <button id="start-button">Start Now</button>
                    </Link>
                </section>

                <section id="features">
                    <h2>Discover Path Mind Features</h2>
                    <div className="feature-card">
                        <h3>🌱 Grow</h3>
                        <p>Start from scratch, we'll guide you to mastery.</p>
                    </div>
                    <div className="feature-card">
                        <h3>🔍 Discover</h3>
                        <p>Find learning resources that suit your style.</p>
                    </div>
                    <div className="feature-card">
                        <h3>📈 Track</h3>
                        <p>Keep tabs on your progress with real-time analytics.</p>
                    </div>
                </section>

                <section id="interactive-demo">
                    <h2>Try out the Demo</h2>
                    <p>Click below to experience a live demo of creating your first learning path.</p>

                    <Link to="/demo">
                        <button id="demo-button">Demo</button>
                    </Link>
                </section>
            </div>

        </div>
    );
}

export default Home;

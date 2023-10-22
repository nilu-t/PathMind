const About = () => {
    return(
        <div id="about-div">
            <h1>About Path Mind</h1>
            <div id="problem-statement">
                <h2>Why Path Mind?</h2>
                <p>In today's digital age, learning resources are abundant but scattered. The challenge is not just finding quality content but effectively organizing, tracking, and utilizing these resources to achieve your learning goals.</p>
            </div>

            <div id="solution">
                <h2>Our Solution</h2>
                <p>Path Mind is your personal learning dashboard. Create customized learning paths that align with your goals, be it mastering data structures, learning a new programming language, or venturing into machine learning.</p>
                <ul>
                    <li>📝 Store Notes: Quickly jot down your thoughts or summarize key takeaways.</li>
                    <li>📎 Add Resources: Attach links, code snippets, and other essential resources right within your learning path.</li>
                    <li>🔔 Reminders: Never miss a learning deadline with our built-in reminders.</li>
                </ul>
            </div>

            <div id="tech-stack">
                <h2>Technology Stack</h2>
                <ul>
                    <li>Frontend: Developed using React to provide a dynamic user experience.</li>
                    <li>Backend: Powered by Node.js with the Express.js framework for robust and scalable solutions.</li>
                    <li>Database: Leveraging MySQL for secure and efficient data storage.</li>
                    <li>User Authentication: Firebase user authentication to ensure the utmost security.</li>
                </ul>
            </div>

            <div id="future-plans">
                <h2>What's Next?</h2>
                <p> Keep an eye out for upcoming features like community-driven learning paths, skill assessment quizzes with Open AI API integration, and more.</p>
            </div>
        </div>
    )
}

export default About;

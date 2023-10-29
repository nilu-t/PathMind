import { Link } from "react-router-dom";

const BuyMeACoffee = () => {
    return (
        <div id="buy-me-a-coffee-div">
            <h1> Hi, I'm Nilushanth 👋 </h1>

            <div id="about-me-div">
                <p>
                I created this platform, PathMind, as a sandbox to show my full stack web development skills. My hope is that it can help others maintain an organized and goal-oriented learning journey. The source code for this site is open-source and can be found here: 
                <a href="https://github.com/nilu-t/PathMind" draggable={false}>GitHub Repository</a>. 
                If you find this platform useful, consider supporting my work through the following BuyMeACoffee link:   
                <Link to="/BuyMeACoffee" draggable={false}>Support with a Coffee ☕</Link>
                </p>

                <img src="/other-images/buy-me-coffee.png" draggable={false}></img>
            </div>


            <h3>Let's Connect !</h3>
            <div id="lets-connect-div">
                <a href="https://www.linkedin.com/in/nilushanth-thiruchelvam/" draggable={false}>
                    <figure>
                        <img src="/other-images/linkedin-logo.png" draggable={false}></img>
                        <figcaption>Linkedin</figcaption>
                    </figure>
                </a>
                <a href="https://github.com/nilu-t" draggable={false}>
                    <figure>
                        <img src="/other-images/github-logo.png" draggable={false}></img>
                        <figcaption>Github</figcaption>
                    </figure>
                </a>
                <a href="https://www.chess.com/member/nilu06" draggable={false}>
                    <figure>
                        <img src="/other-images/chessdotcom-logo.png" draggable={false}></img>
                        <figcaption>Chess challenge?</figcaption>
                    </figure>
                </a>
            </div>
        </div>
    );
}

export default BuyMeACoffee;

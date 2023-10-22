import { Link } from "react-router-dom";

const BuyMeACoffee = () => {
    return (
        <div id="buy-me-a-coffee-div">
            <h1> Hi, I'm Nilushanth 👋 </h1>

            <div>
                <p>
                I created this platform, PathMind, as a sandbox to hone my web development skills. My hope is that it can help others maintain an organized and goal-oriented learning journey. The source code for this site is open-source and can be found here: 
                <a href="https://github.com/nilu-t">GitHub Repository</a>. 
                If you find this platform useful, consider supporting my work through the following BuyMeACoffee link: 
                <Link to="/BuyMeACoffee">Support with a Coffee ☕</Link>
                </p>
            </div>
        </div>
    );
}

export default BuyMeACoffee;

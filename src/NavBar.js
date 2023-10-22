import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div id="nav-bar">
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/SignUp'>Sign Up</Link>
                    </li>
                    <li>
                        <Link to='/About'>About</Link>
                    </li>
                    <li>
                        <Link to='/MyPath'>My Path</Link>
                    </li>
                    <li>
                        <Link to='/Activity'>Activity</Link>
                    </li>
                    <li>
                        <Link to='/BuyMeACoffee'>☕</Link> {/** This will be last li element so that the emoji appears big in css through nth last child */}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
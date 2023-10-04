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
                        <Link to='/About'>About</Link>
                    </li>
                    <li>
                        <Link to='/NotesList'>My Notes</Link>
                    </li>
                    <li>
                        <Link to='/Activity'>Activity</Link>
                    </li>
                    <li>
                        <Link to='/BuyMeACoffee'>☕</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
import { Link } from "react-router-dom";
import "./media-org-css/TopMenu.css";
import "../../pages/pages-css/media-queries.css"

//The TopMenu component holds the nav bar. It was originally in App.jsx before I pulled it out for reusability and styling.
//The <span> in Line 11 allows me to add specific styling to that character.

const TopMenu = () => {

    return (
        <header className="top-menu">
            <h1 className="website-name">Play<span className="fifth-letter">B</span>ack</h1>
            <nav>
                <Link to='/' className="home-nav">Home</Link>
                <Link to='/About'>About</Link>
                <Link to='/Rewind'>Rewind</Link>
                <Link to='/Up-Next'>Up Next</Link>
                <Link to='/account'>Account</Link>
            </nav>
        </header>
    );
};

export default TopMenu;
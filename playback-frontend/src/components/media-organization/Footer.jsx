import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="footer">
            <p>2025 PlayBack Version 1.0</p>
            <nav className="footer-nav">
                <Link to='/' className="home-nav">Home</Link>
                <Link to='/Rewind'>Rewind</Link>
                <Link to='/Up-Next'>Up Next</Link>
                <Link to='/About'>About</Link>
                <Link to='/account'>Account</Link>
            </nav>
        </footer>
    )
}

export default Footer;
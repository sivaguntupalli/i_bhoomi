import { Link } from "react-router-dom";
import "./layout.scss"; // Assuming you have styles for layout

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/properties">Properties</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
}

export default Header;

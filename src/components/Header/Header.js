import { Link } from 'react-router-dom';
import './Header.css';  // Import the CSS file

const Header = () => {
    return (
        <header className="header d-flex">

           <h1>Online Bookstore</h1>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">Cart</Link>
                    </li>
                </ul>
                <Link to="/contact" className="nav-link float-right">Log Out</Link>

            </nav>
        </header>
    );
};

export default Header;
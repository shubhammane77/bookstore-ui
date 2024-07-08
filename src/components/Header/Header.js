import { Link, useNavigate } from 'react-router-dom';
import './Header.css';  // Import the CSS file
import { useSelector, useDispatch } from 'react-redux';
import { user_logout } from '../../redux/actions/userActions';

const Header = () => {
    const userId = useSelector(state => state.user.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(user_logout());
        navigate('/login');
    };

    if(userId === 0){
        return null;
    }
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
                <button onClick={handleLogout} className="nav-link float-right">Log Out</button>

            </nav>

        </header>

    );
};

export default Header;
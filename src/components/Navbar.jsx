import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated, scrolled }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">STREAMLY</Link>
                <ul className="navbar-menu">
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">TV Shows</Link></li>
                            <li><Link to="/">Movies</Link></li>
                            <li><Link to="/">My List</Link></li>
                            <li><button onClick={handleLogout}>Sign Out</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Sign In</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
                <Link to="/">
                    {/* <img src="./images/isleway(1).png" alt="Logo" className="logo-image" /> */}
                </Link>
            <ul>
            <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </ul>
            <form className="search-form">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
        </nav>
    );
}

export default Navbar;

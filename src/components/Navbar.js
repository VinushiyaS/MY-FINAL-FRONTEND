import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
                <Link to="/">
                CrickBidders
                </Link>
            <ul>
            <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>

            </ul>
            <form className="search-form">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                    <button1 type="submit" className="search-button">Search</button1>
                </form>
        </nav>
    );
}

export default Navbar;

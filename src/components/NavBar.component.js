// 1. Import libraries
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

// 2. Create a class component
class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Exercise Tracker</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Exercises</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Exercise Log</Link>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/user" className="nav-link">Create User</NavLink>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}

// 3. Export the component
export default NavBar;
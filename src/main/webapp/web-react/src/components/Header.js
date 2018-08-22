import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/write">Write</Link></li>
                <li><Link to="/view">View</Link></li>
                <li><Link to="/about">About</Link></li>
            </div>
        );
    }
}

export default Header;
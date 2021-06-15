import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

export const Navigation = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Dashboard</Link>
            </li>
            <li>
                <Link to="/btngame">Button Game</Link>
            </li>
        </ul>
    </nav>
);

export const ConnectedNavigation = connect(state => state)(Navigation);
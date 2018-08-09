import React from 'react';
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink exact to="/"><i className="fa fa-home"></i>Kalendarz</NavLink></li>
                <li><NavLink exact to="/x"><i className="fa fa-home"></i>TODO</NavLink></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
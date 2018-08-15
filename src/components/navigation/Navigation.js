import React from 'react';
import { NavLink } from "react-router-dom";
import Calendar from '../home/Calendar'
import Courses from '../courses/Courses'
import './Navigation.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Navigation = () => {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li><NavLink exact to="/">Kalendarz</NavLink></li>
                        <li><NavLink to="/przedmioty">Zajęcia</NavLink></li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/" component={Calendar} exact />
                    <Route path="/przedmioty" component={Courses} exact />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Navigation;
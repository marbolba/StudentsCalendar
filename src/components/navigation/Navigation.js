import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Calendar from '../calendar/Calendar'
import Courses from '../courses/Courses'
import Login from '../user_management/Login'
import './Navigation.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import { loginUser, logoutUser } from '../../redux/actions/userActions'
import default_avatar from '../../icon/default_avatar.png'
import expand_button from '../../icon/expand_button.png'

class Navigation extends Component {
    state = {
        user_drop_down_toggle: false,
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleOutDropdownClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutDropdownClick, false);
    }

    handleOutDropdownClick = (event) => {
        if (!this.dropdown.contains(event.target) && !this.dropdown_arrow.contains(event.target)) {
            this.setState({
                user_drop_down_toggle: false
            })
        }
    }
    toggle_dropdown_visibility = () => {
        this.setState({
            user_drop_down_toggle: !this.state.user_drop_down_toggle
        })
    }

    render() {
        return (
            <BrowserRouter>
                {this.props.userAuthorized ?
                    <div>
                        <nav>
                            <ul>
                                <li><NavLink exact to="/">Kalendarz</NavLink></li>
                                <li><NavLink to="/przedmioty">Zajęcia</NavLink></li>
                                <li id="user-management">
                                    <div id="user-manager">
                                        <img id="avatar" src={default_avatar} alt="avatar"></img>
                                        <p>{this.props.userName}</p>
                                        <img id="expand" onClick={this.toggle_dropdown_visibility} src={expand_button} alt="expand button" ref={dropdown_arrow => this.dropdown_arrow = dropdown_arrow}></img>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div id="user-drop-down" style={this.state.user_drop_down_toggle ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                            <span ref={dropdown => this.dropdown = dropdown} onClick={() => {
                                this.toggle_dropdown_visibility()
                                this.props.logoutUser()
                            }}>Wyloguj</span>
                        </div>

                        <Switch>
                            <Route path="/" component={Calendar} exact />
                            <Route path="/przedmioty" component={Courses} exact />
                            <Route path="/login" component={Login} exact />
                        </Switch>
                    </div>
                    :
                    <div>
                        <span style={{visibility:"hidden"}} ref={dropdown => this.dropdown = dropdown}></span>
                        <img style={{visibility:"hidden"}} alt="expand button" ref={dropdown_arrow => this.dropdown_arrow = dropdown_arrow}></img>

                        <Switch>
                            <Route path="/" component={Login} exact />
                            <Route path="/przedmioty" component={Login} exact />
                            <Route path="/login" component={Login} exact />
                        </Switch>
                    </div>
                }
            </BrowserRouter>
        );
    }
};

const mapStateToProps = store => {
    return {
        userName: store.user.userName,
        userAuthorized: store.user.userAuthorized
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginUser: (userObj) => {
            dispatch(
                loginUser(userObj.userName, userObj.userId, userObj.email, userObj.name, userObj.surname)
            )
        },
        logoutUser: () => {
            dispatch(logoutUser())
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation)
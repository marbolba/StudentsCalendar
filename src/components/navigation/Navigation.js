import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Calendar from '../home/Calendar'
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
        user_drop_down_toggle: "hidden",
    }

    toggle_dropdown_visibility = () => {
        console.log(this.state.user_drop_down_toggle)
        if(this.state.user_drop_down_toggle==="visible"){
            this.setState({user_drop_down_toggle:"hidden"})
        }else{
            this.setState({user_drop_down_toggle:"visible"})
        }
        
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
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li id="user-management">
                                    <div id="user-manager">
                                        <img id="avatar" src={default_avatar} alt="avatar"></img>
                                        <p>{this.props.userName}</p>
                                        <img id="expand" onClick={this.toggle_dropdown_visibility} src={expand_button} alt="expand button"></img>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div id="user-drop-down" style={{ visibility: this.state.user_drop_down_toggle }}>
                            <span onClick={this.props.logoutUser}>wyloguj</span>
                        </div>

                        <Switch>
                            <Route path="/" component={Calendar} exact />
                            <Route path="/przedmioty" component={Courses} exact />
                            <Route path="/login" component={Login} exact />
                        </Switch>
                    </div>
                    :
                    <div>
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
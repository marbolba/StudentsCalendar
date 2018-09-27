import React, { Component } from 'react';
import './Login.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import { loginUser,logoutUser} from '../../redux/actions/userActions'

class Login extends Component {
    state = {
        loginView: true,
        newLogin: "",
        newPassword: "",
        name: "",
        surname: "",
        email: "",
    }

    toggleLoginView = () => {
        this.setState({
            loginView: !this.state.loginView,
            newLogin: "",
            newPassword: "",
            name: "",
            surname: "",
            email: "",
        })
    }

    handleLogin = () => {
        if (this.state.newLogin !== "" && this.state.newPassword !== "") {
            let data = {
                "userName": this.state.newLogin,
                "password": this.state.newPassword
            }
            let url = "http://localhost:4141/api/user/auth"
            axios.post(url, data)
                .then((res) => {
                    this.props.loginUser(res.data)
                }).catch((err) => {
                    toast.error("Nieprawidłowy login lub hasło")
                })
        } else {
            toast.error("Prosze podac login i hasło")
        }
    }
    handleRegister = () => {
        if (this.state.newLogin !== "" && this.state.newPassword !== "" && this.state.email !== "") {
            let data = {
                "userName": this.state.newLogin,
                "password": this.state.newPassword,
                "name": this.state.name,
                "surname": this.state.surname,
                "email": this.state.email
            }
            let url = "http://localhost:4141/api/user"
            axios.post(url, data)
                .then((res) => {
                    console.log(res.data)
                    this.props.loginUser(res.data)
                })
                .catch((e) => {
                    console.log("error fetching data")
                })
        } else {
            toast.error("Prosze podac poprawdne dane")
        }
    }

    render() {
        return (
            <div className="user-management-view">
                <p>uzytkownik: {this.props.userName}</p>
                {this.state.loginView ?
                    <div className="form">
                        <h1>Logowanie</h1>
                        <p>Login</p>
                        <input type="text" value={this.state.newLogin} onChange={(e) => this.setState({ newLogin: e.target.value })}></input>
                        <p>Haslo</p>
                        <input type="password" value={this.state.newPassword} onChange={(e) => this.setState({ newPassword: e.target.value })}></input>
                        <div className="buttons">
                            <button onClick={this.handleLogin}>Login</button>
                            <button onClick={this.toggleLoginView}>Zajerestruj się</button>
                        </div>
                    </div> :
                    <div className="form">
                        <h1>Rejestracja</h1>
                        <p>Login</p>
                        <input type="text" value={this.state.newLogin} onChange={(e) => this.setState({ newLogin: e.target.value })}></input>
                        <p>Email</p>
                        <input type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}></input>
                        <p>Imie</p>
                        <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}></input>
                        <p>Nazwisko</p>
                        <input type="text" value={this.state.surname} onChange={(e) => this.setState({ surname: e.target.value })}></input>
                        <p>Haslo</p>
                        <input type="password" value={this.state.newPassword} onChange={(e) => this.setState({ newPassword: e.target.value })}></input>
                        <div className="buttons">
                            <button onClick={this.handleRegister}>Rejestracja</button>
                            <button onClick={this.toggleLoginView}>Login</button>
                        </div>
                    </div>}
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        userName: store.user.userName
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginUser: (userObj) => {
            console.log(userObj)
            dispatch(
                loginUser(userObj.userName, userObj.userId, userObj.email, userObj.name, userObj.surname)
            )
        },
        logoutUser: ()=>{
            dispatch(logoutUser())
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
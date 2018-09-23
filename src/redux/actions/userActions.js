export function registerUser(userName, password) {
    return {
        type: "REGISTER_USER",
        userName: userName,
        password: password

    }
}
export function loginUser(userName,userId,email,name,surname) {
    return {
        type: "LOGIN_USER",
        userAuthorized: true,
        userName: userName,
        userId: userId,
        email: email,
        name: name,
        surname: surname
    }
}
export function logoutUser(){
    return {
        type: "LOGOUT_USER"
    }
}
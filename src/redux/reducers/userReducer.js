export default function reducer(state = {
    userAuthorized: false,
    userName: "",
    userId: "",
    email: "",
    name: "",
    surname: ""
}, action) {
    console.log(state)
    switch (action.type) {
        case "LOGIN_USER":
            return {
                ...state,
                userAuthorized: true,
                userId: action.userId,
                userName: action.userName,
                email: action.email,
                name: action.name,
                surname: action.surname
            }
        case "LOGOUT_USER":
            return {
                userAuthorized: false,
                userName: "",
                userId: "",
                email: "",
                name: "",
                surname: ""
            }
        default:
            return state
    }
}
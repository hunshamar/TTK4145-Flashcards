
import axios from 'axios';
import { LOG_IN_CALLBACK, LOG_IN_STATUS, LOG_OUT, SET_ALERT } from '../actionTypes';




export const signInCallack = () => async (dispatch) => {
    axios.get("/api/login/callback", { withCredentials: true })
        .then(response => {
            let user_token = response.data.user_token
            let refresh_token = response.data.refresh_token
            console.log("action, usertoken", user_token)
            console.log("action, refresh", refresh_token)
            localStorage.setItem("user_token", user_token)
            localStorage.setItem("refresh_token", refresh_token)
            const payload = {loggedIn: true}
            dispatch({type: LOG_IN_CALLBACK, payload})
        })
        .catch(err => {
            console.log("Error in signInCallback", err)
            const alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })
}

export const adminOnly = () => async (dispatch) => {
    axios.get("/api/adminonly", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
    })
    .then(response => {
        console.log("from admin test")
        console.log(response.data)       
        const alert = {severity: "success", text: response.data.status}
        dispatch({type: SET_ALERT, payload: alert})
 

        // dispatch({type: LOG_IN_CALLBACK, payload})
    })
    .catch(err => {
        console.log("Error in signInCallback", err)
        const alert = {severity: "error", text: err.toString()}
        dispatch({type: SET_ALERT, payload: alert})
    })
}

export const checkLogInStatus = () => async (dispatch, getState) => {
    
    const user_token = localStorage.getItem("user_token")
    const refresh_token = localStorage.getItem("refresh_token")

    console.log("user_token?", Boolean(user_token))
    console.log("refresh_token?", Boolean(refresh_token))

    if (user_token && refresh_token){
        console.log("found both tokens")
        axios.get("/api/getcurrentuser", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user_token")}`
            }
        }).then(res => {
            console.log("found user?", res.data)
            console.log("true? ", res.data.roles.includes("Admin"))
            let payload = {loggedIn: true, loggedInUser: res.data, isAdmin: res.data.roles.includes("Admin")}
            dispatch({type: LOG_IN_STATUS, payload})
        }).catch(err => {
            console.log("error..", err)
            let payload = {loading: false, loggedInUser: {}}
            dispatch({type: LOG_IN_STATUS, payload})

            const alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })
    }
    else {
        console.log("no user logged in")
        let payload = {loggedIn: false, loggedInUser: {}, loading: false}
        dispatch({type: LOG_IN_STATUS, payload})
    }

}

export const signOut = () => async (dispatch, getState) => {

    if (localStorage.getItem("user_token")) {
        const token = localStorage.getItem("user_token")
        axios.post("/api/logout/access", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                localStorage.removeItem("user_token")
            }
        })
    }
    if (localStorage.getItem("refresh_token")) {
        const refreshToken = localStorage.getItem("refresh_token")
        axios.post("/api/logout/refresh", {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                localStorage.removeItem("refresh_token")
            }
        })
    }
    localStorage.clear();

    console.log("logging out...")
    const payload = {loggedIn: false, loggedInUser: {}}
    dispatch({type: LOG_OUT, payload})

}


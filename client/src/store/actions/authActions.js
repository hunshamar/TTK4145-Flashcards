
import axios from 'axios';
import { LOG_IN_CALLBACK, LOG_IN_STATUS, LOG_OUT, SET_ALERT, SET_LOADING } from '../actionTypes';




export const signInCallack = () => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true })
    await axios.get("/api/login/callback", { withCredentials: true })
        .then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            let user_token = res.data.user_token
            let refresh_token = res.data.refresh_token
            console.log("action, usertoken", user_token)
            console.log("action, refresh", refresh_token)
            localStorage.setItem("user_token", user_token)
            localStorage.setItem("refresh_token", refresh_token)
            const payload = { loggedIn: true }
            dispatch({ type: LOG_IN_CALLBACK, payload })
        })
        .catch(err => {
            console.log("Error in signInCallback", err)
            const alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })
    dispatch({ type: SET_LOADING, payload: false })
}

export const checkLogInStatus = () => async (dispatch, getState) => {




    await refreshTokens()

    const user_token = localStorage.getItem("user_token")
    const refresh_token = localStorage.getItem("refresh_token")

    console.log("user_token?", Boolean(user_token))
    console.log("refresh_token?", Boolean(refresh_token))

    if (user_token && refresh_token) {
        console.log("found both tokens")
        axios.get("/api/currentuser/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user_token")}`
            }
        }).then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            console.log("found user?", res.data)
            console.log("true? ", res.data.role === "Admin")
            let payload = { loggedIn: true, loggedInUser: res.data, isAdmin: res.data.role == "Admin" }
            dispatch({ type: LOG_IN_STATUS, payload })
        }).catch(err => {
            console.log("error..", err)
            let payload = { loading: false, loggedInUser: {} }
            dispatch({ type: LOG_IN_STATUS, payload })

            // const alert = {severity: "error", text: err.toString()}
            // dispatch({type: SET_ALERT, payload: alert})
        })
    }
    else {
        console.log("no user logged in")
        let payload = { loggedIn: false, loggedInUser: {}, loading: false }
        dispatch({ type: LOG_IN_STATUS, payload })
    }

}

export const signOut = () => async (dispatch, getState) => {
    // await refreshTokens()

    if (localStorage.getItem("user_token")) {
        const token = localStorage.getItem("user_token")
        axios.post("/api/logout/accesstoken", {}, {
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
        axios.post("/api/logout/refreshtoken", {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }).then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            } else {
                localStorage.removeItem("refresh_token")
            }
        })
    }
    localStorage.clear();

    console.log("logging out...")
    const payload = { loggedIn: false, loggedInUser: {} }
    dispatch({ type: LOG_OUT, payload })

}

export const refreshTokens = async () => {
    const user_token = localStorage.getItem("user_token")
    try {
        /* Will return error if token expire */
        await axios.post("/api/token/expired", {}, {
            headers: {
                Authorization: `Bearer ${user_token}`
            }
        }).then(res => {
            console.log(res.data)
            return true
        })
    }
    catch {
        console.log("Expired. Use refresh")
        const refresh_token = localStorage.getItem("refresh_token")
        if (!refresh_token) {
            localStorage.removeItem("user_token")
            return false;
        }
        await axios.post("/api/token/refresh", {}, {
            headers: {
                Authorization: `Bearer ${refresh_token}`
            }
        }).then(res => {
            console.log("NEW TOKEN")
            localStorage.setItem("user_token", res.data.token)
        }).catch(err => {
            const alert = { severity: "error", text: err.toString() }
            console.log("my error", alert)
            // dispatch({ type: SET_ALERT, payload: alert })
        })
        return true;
    }
}

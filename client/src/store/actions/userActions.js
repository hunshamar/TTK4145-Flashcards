
import axios from 'axios';
import { GET_DELIVERY_STATUS, GET_USERS, SET_ALERT, SET_LOADING , UPDATE_USER} from '../actionTypes';
import { refreshTokens } from './authActions';

export const getAllUsers = () => async (dispatch) => {
    await refreshTokens()
    axios.get("/api/admin/users", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
    })
        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("res data alll", res.data)
            dispatch({type: GET_USERS, payload: res.data})
        })
        .catch(err => {
            console.log("Error in get users", err)
            const alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })
}

export const getUsersWithRole = (role) => async (dispatch) => {
    await refreshTokens()
    axios.get("/api/admin/users/role="+role, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
    })
        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("res data role ="+role, res.data)
            dispatch({type: GET_USERS, payload: res.data})
        })
        .catch(err => {
            console.log("Error in get users", err)
            const alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })
}

export const searchUsers = (role, searchPhrase, ) => async (dispatch) => {
    await refreshTokens()
    await axios.get(`/api/admin/users/search/role=${role}/q=${searchPhrase}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
    })
        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("res data", res.data)
            dispatch({type: GET_USERS, payload: res.data})
        })
        .catch(err => {
            console.log("Error in get users", err)
            const alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })
}


export const getUsersStatus = (cardgroupId) => async (dispatch, getState) => {
    


    if (!cardgroupId){
        dispatch({type: GET_DELIVERY_STATUS, payload: []})
    }
    else {

        dispatch({type: SET_LOADING, payload: true})
        await refreshTokens()
        await axios.get(`/api/admin/cardgroup/${cardgroupId}/deliverystatus`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user_token")}`
            }
        })
        .then(res => {
            if(res.data.error){
                console.log("error")
                throw new Error(res.data.error)
            }
            const status = res.data
            console.log("mah status")
            console.log(status)
            dispatch({type: GET_DELIVERY_STATUS, payload: status})
        })
        .catch(err => console.log(err))
        dispatch({type: SET_LOADING, payload: false})
    }

}


export const addAdmin = (user) => async (dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})   
    await refreshTokens()
    axios.post("/api/admin/"+user.id, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
    })
    .then(res => {
        if(res.data.error){
            console.log("error")
            throw new Error(res.data.error)
        }
        const updatedUser = res.data
        dispatch({type: UPDATE_USER, payload: updatedUser})
    })
    .catch(err => console.log(err))

    dispatch({type: SET_LOADING, payload: false})
}

export const removeAdmin = (user) => async (dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})   
    await refreshTokens()
    axios.delete("/api/admin/"+user.id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
    })
    .then(res => {
        if(res.data.error){
            console.log("error")
            throw new Error(res.data.error)
        }
        const updatedUser = res.data
        dispatch({type: UPDATE_USER, payload: updatedUser})
    })
    .catch(err => console.log(err))

    dispatch({type: SET_LOADING, payload: false})
}



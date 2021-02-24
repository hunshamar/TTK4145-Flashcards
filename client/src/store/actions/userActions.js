
import axios from 'axios';
import { GET_DELIVERY_STATUS, GET_USERS, SET_ALERT, SET_LOADING } from '../actionTypes';




export const getUsers = () => async (dispatch) => {
    axios.get("/api/users", {
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
    dispatch({type: SET_LOADING, payload: true})

    if (!cardgroupId){
        dispatch({type: GET_DELIVERY_STATUS, payload: []})
    }

    axios.get("/api/deliverystatus/"+cardgroupId, {
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




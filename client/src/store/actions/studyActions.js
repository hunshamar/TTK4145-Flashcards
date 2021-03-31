import axios from 'axios';
import { SET_ALERT, SET_LOADING , LOAD_CARDREVIEW_DECK, LOAD_CARDREVIEWS} from '../actionTypes';
import { refreshTokens } from './authActions';

export const getCardreviewDeck = () => async (dispatch) => {
    dispatch({type: SET_LOADING, payload: true})   
    await refreshTokens()
    axios.get("/api/currentuser/cardreviewdeck", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
    })
    .then(res => {
        if(res.data.error){
            throw new Error(res.data.error)
        }
        console.log("res data alll", res.data)
        dispatch({type: LOAD_CARDREVIEW_DECK, payload: res.data})
    })
    .catch(err => {
        console.log("Error ", err)
        const alert = {severity: "error", text: err.toString()}
        dispatch({type: SET_ALERT, payload: alert})
    })

    dispatch({type: SET_LOADING, payload: false})   
}

export const addCardsToDeck = () => async (dispatch) => {
    dispatch({type: SET_LOADING, payload: true})   
    await refreshTokens()
    axios.post("/api/currentuser/cardreviews", {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
    })
    .then(res => {
        if(res.data.error){
            throw new Error(res.data.error)
        }
        console.log("res alll", res.data)
        dispatch({type: LOAD_CARDREVIEWS, payload: res.data})
    })
    .catch(err => {
        console.log("Error ", err)
        const alert = {severity: "error", text: err.toString()}
        dispatch({type: SET_ALERT, payload: alert})
    })

    dispatch({type: SET_LOADING, payload: false})   
}

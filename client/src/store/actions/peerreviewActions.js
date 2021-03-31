import axios from 'axios';
import { CREATE_PEERREVIEW, LOAD_PEERREVIEWS, SET_LOADING, SET_ALERT, GET_USER_ALL_PEERREVIEWS } from '../actionTypes';
import { refreshTokens } from './authActions';

export const createPeerreviews = ({groupId, dueDate, numberOfReviews}) => async( dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()
        
    
    await axios.post("/api/admin/peerreviews", {
            groupId: groupId,
            dueDate: dueDate,
            numberOfReviews: numberOfReviews
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)
            
            if(res.data.error){
                console.log("error")
                throw new Error(res.data.error)
            }


            const status = res.data
            
            let alert = {severity: "success", text: "successfully created peerreviews"}
            dispatch({type: SET_ALERT, payload: alert})
            console.log("søk", status)
            if (res.data.status === "success"){
                dispatch(getUserPeerreviews())
            }
        })
        .catch(err => {
            console.log("This is an error yes plz")
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })

    dispatch({type: SET_LOADING, payload: false})
    
};

export const getUserPeerreviews = () => async( dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()
        
    
    await axios.get("/api/currentuser/peerreviews", 
    {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token")
        }
    })

   

        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)
            
            if(res.data.error){
                console.log("error")
                throw new Error(res.data.error)
            }


            const peerReviews = res.data
            console.log("was found, ",  peerReviews)
            dispatch({type: LOAD_PEERREVIEWS, payload: peerReviews})
            // let alert = {severity: "success", text: "successfully got peerreviews: "+peerReviews}
            // dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_PEERREVIEW, payload: createdCardgroup})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_CARDGROUP_ERROR, err})
        })

    dispatch({type: SET_LOADING, payload: false})
    
};

export const loadPeerreview = (pid) => async( dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()
        
    
    await axios.get("/api/currentuser/peerreviews/"+pid+"/ratings/", 
    {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token")
        }
    })

   

        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("returne 123")
            console.log(res.data)
            
            if(res.data.error){
                console.log("error")
                throw new Error(res.data.error)
            }


            const peerreview = res.data
            console.log("was found, ",  peerreview)
            dispatch({type: LOAD_PEERREVIEWS, payload: [peerreview]})
            // let alert = {severity: "success", text: "successfully got peerreviews: "+peerreview}
            // dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_PEERREVIEW, payload: createdCardgroup})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_CARDGROUP_ERROR, err})
        })

    dispatch({type: SET_LOADING, payload: false})
    
};



export const getCardgroupPeerreviews = (cardgroupId) => async( dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})

    if (!cardgroupId){
        dispatch({type: LOAD_PEERREVIEWS, payload: []})
    } else {



    await refreshTokens()
    await axios.get("/api/admin/peerreviews/"+cardgroupId, 
    {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token")
        }
    })

   

        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)
            
            if(res.data.error){
                console.log("error")
                throw new Error(res.data.error)
            }


            const peerReviews = res.data
            console.log("was found, ",  peerReviews)
            dispatch({type: LOAD_PEERREVIEWS, payload: peerReviews})
            // let alert = {severity: "success", text: "successfully got peerreviews: "+peerReviews}
            // dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_PEERREVIEW, payload: createdCardgroup})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_CARDGROUP_ERROR, err})
        })
        
    }
        
    

    dispatch({type: SET_LOADING, payload: false})
    
};


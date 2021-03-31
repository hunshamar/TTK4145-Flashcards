
import axios from 'axios';
import { CREATE_RATING, LOAD_RATINGS, SET_ALERT, SET_LOADING } from '../actionTypes';
import { refreshTokens } from './authActions';

export const saveRating = ({rating, cardNumber}) => async( dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})   
    await refreshTokens()     
    await axios.post("/api/currentuser/cardrating/"+rating.cardId, {
            difficulty: rating.difficulty,
            quality: rating.quality,
            cardId: rating.cardId,
            duplicateCardIds: rating.duplicateCardIds.join()
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
            
           
            const createdRating = res.data

            console.log("was created, ", createdRating)
            let alert = {severity: "success", text: "Ratings saved successfully"}
            dispatch({type: SET_ALERT, payload: alert})
            dispatch({type: CREATE_RATING, payload: createdRating})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_CARDGROUP_ERROR, err})
        })

    console.log("async call up in hier", rating)
    dispatch({type: SET_LOADING, payload: false})
    
};

export const getRating = (cardId) => async( dispatch, getState) => {
    // await refreshTokens()
        
    await axios.get("/api/currentuser/cardrating/"+cardId, 
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

            if (res.data.status !== "no rating")
            {
           
                const foundRating = res.data

                console.log("was found, ", foundRating)
                // let alert = {severity: "success", text: "Saved rating on card: "+cardNumber}
                // dispatch({type: SET_ALERT, payload: alert})
                dispatch({type: CREATE_RATING, payload: foundRating})
            }
        })
        .catch(err => {
            console.log("Not found")
            // let alert = {severity: "error", text: err.toString()}
            // dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_CARDGROUP_ERROR, err})
        })

    // console.log("async call up in hier", rating)
    
};


export const getRatingsInPeerreview = (peerreviewid) => async( dispatch, getState) => {
    await refreshTokens()
    console.log("Is this aused")
    await axios.get("http://localhost:5000/api/currentuser/cardratings/"+peerreviewid, 
         {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {

            console.log("hes")

            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("returned", res.data)

            
           
            const foundRatings = res.data

            console.log("was found getratingsinpeererview, ", foundRatings)
            // let alert = {severity: "success", text: "Saved rating on card: "+cardNumber}
            // dispatch({type: SET_ALERT, payload: alert})
            dispatch({type: LOAD_RATINGS, payload: foundRatings})
            
        })
        .catch(err => {
            console.log("Not found")
            // let alert = {severity: "error", text: err.toString()}
            // dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_CARDGROUP_ERROR, err})
        })

    // console.log("async call up in hier", rating)
    
};


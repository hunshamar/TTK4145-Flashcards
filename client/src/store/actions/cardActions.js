
import axios from 'axios';
import { SET_ALERT, CREATE_CARD, DELETE_CARD, DELETE_CARD_ERROR, LOAD_CARDS, LOAD_CARD, SET_LOADING, CLEAR_CARDS } from '../actionTypes';
import { refreshTokens } from './authActions';

export const addCard = (card) => async( dispatch, getState) => {
    await refreshTokens()
    
    axios.post("/api/currentuser/flashcards", {
            front: card.front,
            back: card.back,
            cardgroupid: card.cardgroupid
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {
            console.log("returned")
            console.log(res.data)
            if(res.data.error){
                console.log("error")
                throw new Error(res.data.error)
            }

            const createdCard = res.data
            dispatch({type: CREATE_CARD, payload: createdCard})
            let alert = {severity: "success", text: "successfully created card"}
            dispatch({type: SET_ALERT, payload: alert})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            console.log(err.toString())
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })

    console.log("async call up in hier", card)
    
};

export const editCard = (card) => async( dispatch, getState) => {
    await refreshTokens()
    console.log("carddd", card)
    
    axios.put("/api/currentuser/flashcards/"+card.id, {
            front: card.front,
            back: card.back,
            // cardgroupid: card.cardgroupid

        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {
            console.log("returned")
            console.log(res.data)
            if(res.data.error){
                console.log("error")
                throw new Error(res.data.error)
            }
            const changedCard = res.data
            dispatch({type: DELETE_CARD, payload: card})
            dispatch({type: CREATE_CARD, payload: changedCard})

            let alert = {severity: "success", text: "successfully changed card"}
            dispatch({type: SET_ALERT, payload: alert})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            console.log(err.toString())
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })

    console.log("async call up in hier", card)
    
};

export const loadCardGroupUserFlashcards = (cardgroupId) => async dispatch => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()
    console.log("cardgroupid", cardgroupId)

    await axios.get(`/api/currentuser/flashcards/cardgroupid=${cardgroupId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user_token")}`
            }
        })
        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            const cards = res.data
            console.log("lmlmlml")
            console.log(cards)
            dispatch({type: LOAD_CARDS, payload: cards})
        })
        .catch(err => console.log(err))


    dispatch({type: SET_LOADING, payload: false})
}

// export const loadCards = props => async (dispatch, getState) => {
//     dispatch({type: SET_LOADING, payload: true})
//     await refreshTokens()


//     await axios.get("/api/flashcards")
//     .then(res => {
//         if(res.data.error){
//             throw new Error(res.data.error)
//         }
//         const cards = res.data
//         console.log("mah cah")
//         console.log(cards)
//         dispatch({type: LOAD_CARDS, payload: cards})
//     })
//     .catch(err => {
//         let alert = {severity: "error", text: err.toString() + " when attempting to get card"}
//         dispatch({type: SET_ALERT, payload: alert})  
//     })

//     dispatch({type: SET_LOADING, payload: false})

// }

export const loadCardgroupFlashcards = (cardgroupId) => async (dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()



    console.log("idd",cardgroupId)

    await axios.get(`/api/admin/cardgroup/${cardgroupId}/flashcards`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
    })
    .then(response => {
        const cards = response.data
        console.log("lmlmlml")
        console.log(cards)
        dispatch({type: LOAD_CARDS, payload: cards})
    })
    .catch(err => {
        let alert = {severity: "error", text: err.toString() + " when attempting to get card"}
        dispatch({type: SET_ALERT, payload: alert})  
    })

    dispatch({type: SET_LOADING, payload: false})

}

export const loadPeerReviewFlashcards = (peerreviewid) => async (dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()


    await axios.get(`/api/peerreview/${peerreviewid}/flashcards`,
    {headers: { 
        Authorization: "Bearer " +localStorage.getItem("user_token") 
    }}
    ).then(response => {
        const cards = response.data
        console.log("lmlmlml")
        console.log(cards)
        dispatch({type: LOAD_CARDS, payload: cards})
    })
    .catch(err => {
        let alert = {severity: "error", text: err.toString() + " when attempting to get card"}
        dispatch({type: SET_ALERT, payload: alert})  
    })

    dispatch({type: SET_LOADING, payload: false})

}



export const clearCardReducer = () => async (dispatch) => {


    console.log("alert tthh")
    dispatch({type: CLEAR_CARDS})
}


export const deleteCard = (card) => async (dispatch, getState) => {
    await refreshTokens()

    console.log("del,", card)

    await axios.delete(`/api/currentuser/flashcards/${card.id}`,
    {headers: { 
        Authorization: "Bearer " +localStorage.getItem("user_token") 
    }}
    ).then(res => {
        console.log(res.data)
        if(res.data.error){
            throw new Error(res.data.error)
        }
        let alert = {severity: "success", text: "successfully deleted card"}
        dispatch({type: SET_ALERT, payload: alert})  
        dispatch({type: DELETE_CARD, payload: card})        
    })
    .catch(err => {
        let alert = {severity: "error", text: err.toString() + " when attempting to delete card"}
        dispatch({type: SET_ALERT, payload: alert})  
        dispatch({type: DELETE_CARD_ERROR, payload: card}) 
    })

}





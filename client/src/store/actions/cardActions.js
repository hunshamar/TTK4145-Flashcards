
import axios from 'axios';
import { SET_ALERT, CREATE_CARD, DELETE_CARD, DELETE_CARD_ERROR, LOAD_CARDS, LOAD_CARD, UPDATE_CARDS, SET_LOADING, CLEAR_CARDS } from '../actionTypes';
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
        .catch(err => {
            let alert = {severity: "error", text: err.toString() + " when attempting to get card"}
            dispatch({type: SET_ALERT, payload: alert})  
        })


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



    console.log("idd",cardgroupId)

    if (!cardgroupId){
        dispatch({type: LOAD_CARDS, payload: []})
    } else {

        await refreshTokens()
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
    }
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



export const getNextCardInUserDeck = (deckId) => async (dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()
    await axios.get(`/api/currentuser/user-flashcard-decks/${deckId}/flashcard`,
    {headers: { 
        Authorization: "Bearer " +localStorage.getItem("user_token") 
    }}
    ).then(response => {
        if(response.data.error){
            throw new Error(response.data.error)
        }
        const card = response.data
        console.log("response card")
        console.log(card)
        dispatch({type: LOAD_CARD, payload: card})
    })
    .catch(err => {
        console.log("error hier")
        let alert = {severity: "error", text: err.toString() + " when attempting to get card"}
        dispatch({type: SET_ALERT, payload: alert})  
    })

    dispatch({type: SET_LOADING, payload: false})

}





export const getCollectiveDeckFlashcards = ({cardgroupIds="all", difficultyMin=0, difficultyMax=10, numberOfCards="all", idOnly=false} = {}) => async (dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()


    console.log(typeof difficulties !== undefined)

    await axios.get(`/api/collective-deck/flashcards?cardgroup-id=${cardgroupIds}&difficulty-min=${difficultyMin}&difficulty-max=${difficultyMax}&ncards=${numberOfCards}${idOnly ? "&id-only=true" : ""}`,
    {headers: {  
        Authorization: "Bearer " +localStorage.getItem("user_token") 
    }}
    ).then(response => {
        if(response.data.error){
            throw new Error(response.data.error)
        }

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



export const clearCardReducer = () => (dispatch) => {


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

export const addCardsToCollectiveDeck = (flashcards) => async( dispatch, getState) => {
    await refreshTokens()
    axios.post("/api/admin/collective-deck/flashcards", {
        flashcards
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {
            console.log("returned hhh")
            console.log(res.data)
            if(res.data.error){
                console.log("error")
                throw new Error(res.data.error)
            }

            const updatedCards = res.data
            dispatch({type: UPDATE_CARDS, payload: updatedCards})
            let alert = {severity: updatedCards.length ? "success" : "info", text: updatedCards.length+" cards added to collective deck "}
            dispatch({type: SET_ALERT, payload: alert})
        })
        .catch(err => {
            console.log(err.toString())
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })    
};

export const removeCardsFromCollectiveDeck = (flashcards) => async( dispatch, getState) => {
    await refreshTokens()
    axios.delete("/api/admin/collective-deck/flashcards", 
         {
             data: {flashcards},
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {
            console.log("returned hhh")
            console.log(res.data)
            if(res.data.error){
                console.log("error")
                throw new Error(res.data.error)
            }

            const updatedCards = res.data
            dispatch({type: UPDATE_CARDS, payload: updatedCards})
            let alert = {severity: updatedCards.length ? "success" : "info", text: updatedCards.length+" cards removed from collective deck "}
            dispatch({type: SET_ALERT, payload: alert})
        })
        .catch(err => {
            console.log(err.toString())
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
        })    
};




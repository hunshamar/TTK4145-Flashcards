import axios from 'axios';
import { LOAD_USER_FLASHCARD_DECKS, LOAD_USER_FLASHCARD_DECK, SET_ALERT, SET_LOADING, DELETE_USER_FLASHCARD_DECK } from '../actionTypes';
import { refreshTokens } from './authActions';

export const createUserFlashcardDeck = ({flashcards, title, nCards}) => async (dispatch) => {    
    // dispatch({ type: S   ET_LOADING, payload: true })

    let sucessfully_created = true

    await refreshTokens()
    await axios.post("/api/currentuser/user-flashcard-decks", 
    {
        flashcards,
        title,
        nCards
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
    }
    })
    .then(res => {
        if (res.data.error) {
            throw new Error(res.data.error)
        }
        console.log("res data alll", res.data)
        dispatch({ type: LOAD_USER_FLASHCARD_DECK, payload: res.data })
        const alert = { severity: "success", text: "Successfully created flashcard deck" }
        dispatch({ type: SET_ALERT, payload: alert })
    })
    .catch(err => {
        sucessfully_created = false
        console.log("Error ", err)
        const alert = { severity: "error", text: err.toString() }
        dispatch({ type: SET_ALERT, payload: alert })
    })
   
    dispatch({ type: SET_LOADING, payload: false })

    return(sucessfully_created)    

}


export const deleteUserFlashcardDeck = (id) => async (dispatch) => {    
    dispatch({ type: SET_LOADING, payload: true })

    await refreshTokens()
    await axios.delete("/api/currentuser/user-flashcard-decks/"+id, 
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
    }
    })
        .then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            console.log("deleted", res.data)
            dispatch({ type: DELETE_USER_FLASHCARD_DECK, payload: res.data })
            const alert = { severity: "success", text: "Successfully deleted flashcard deck" }
            dispatch({ type: SET_ALERT, payload: alert })
        })
        .catch(err => {
            console.log("Error ", err)
            const alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })

    dispatch({ type: SET_LOADING, payload: false })
}




export const getUserFlashcardDecks = ({id} = {}) => async (dispatch) => {    
    dispatch({ type: SET_LOADING, payload: true })

    await refreshTokens()
    axios.get(`/api/currentuser/user-flashcard-decks${id ? `?id=${id}` : ""}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
    }
    })
        .then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            console.log("all decks", res.data)
            dispatch({ type: LOAD_USER_FLASHCARD_DECKS, payload: res.data })
        })
        .catch(err => {
            console.log("Error ", err)
            const alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })

    dispatch({ type: SET_LOADING, payload: false })
}
export const answerFlashcard = ({deckId, flashcardId, correct}) => async (dispatch) => {    
    dispatch({ type: SET_LOADING, payload: true })

    await refreshTokens()
    await axios.post(`/api/currentuser/user-flashcard-decks/${deckId}/flashcard/${flashcardId}/answer`, 
    {
        correct: correct
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
    }
    })
        .then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            let alert = ""
            if (res.data.status === "deleted"){
                alert = { severity: "success", text: "correct: removed card from deck" }
            }
            if (res.data.status === "rotated"){
                alert = { severity: "info", text: "wrong: removed card to back of deck" }
            }
            dispatch({ type: SET_ALERT, payload: alert })   
        } 

        )
        .catch(err => {
            console.log("Error ", err)
            const alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })

    dispatch({ type: SET_LOADING, payload: false })
}




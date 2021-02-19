
import axios from 'axios';
import { SET_ALERT, CREATE_CARD, DELETE_CARD, DELETE_CARD_ERROR, LOAD_CARDS, LOAD_CARD } from '../actionTypes';

export const addCard = (card) => async( dispatch, getState) => {
        
    
    axios.post("/api/addFlashcard", {
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
    console.log("carddd", card)
    
    axios.post("/api/editflashcard", {
            front: card.front,
            back: card.back,
            id: card.id
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

export const loadCards = props => async (dispatch, getState) => {

    if (props){
        await axios.get("/api/cardgroupflashcards/"+props)
        .then(response => {
            const cards = response.data
            console.log("lmlmlml")
            console.log(cards)
            dispatch({type: LOAD_CARDS, payload: cards})
        })
        .catch(err => console.log(err))
    }
    else {
        await axios.get("/api/flashcards")
        .then(response => {
            const cards = response.data
            console.log("mah cah")
            console.log(cards)
            dispatch({type: LOAD_CARDS, payload: cards})
        })
        .catch(err => console.log(err))
    }
}

export const loadCard = props => async (dispatch, getState) => {

    if (props){
        await axios.get("/api/flashcard/"+props)
        .then(response => {
            const card = response.data
            console.log("lmlmlml")
            console.log(card)
            dispatch({type: LOAD_CARD, payload: [card]})
        })
        .catch(err => {
        let alert = {severity: "error", text: err.toString() + " when attemting to get card"}
        dispatch({type: SET_ALERT, payload: alert})  
        })
        
    }
}



export const deleteCard = (card) => async (dispatch, getState) => {

    console.log("del,", card)

    await axios.delete("/api/deleteflashcard/" + card.id, 
    {headers: { 
        Authorization: "Bearer " +localStorage.getItem("user_token") 
    }}
    ).then(res => {
        console.log(res.data)
        let alert = {severity: "success", text: "successfully deleted card"}
        dispatch({type: SET_ALERT, payload: alert})  
        dispatch({type: DELETE_CARD, payload: card})        
    })
    .catch(err => {
        let alert = {severity: "error", text: err.toString() + " when attemting to delete card"}
        dispatch({type: SET_ALERT, payload: alert})  
        dispatch({type: DELETE_CARD_ERROR, payload: card}) 
    })

}





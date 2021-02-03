
import axios from 'axios';

export const addCard = (card) => async( dispatch, getState) => {
        
    
    axios.post("http://localhost:5000/api/addFlashcard", {
            front: card.title,
            back: card.content,
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
            dispatch({type: "CREATE_CARD", createdCard})
            let alert = {severity: "success", text: "successfully created card"}
            console.log("erorr her da")
            dispatch({type: "ALERT", alert})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            console.log(err.toString())
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: "ALERT", alert})
        })

    console.log("async call up in hier", card)
    
};


export const loadCards = props => async (dispatch, getState) => {

    if (props){
        const cards = await axios.get("http://localhost:5000/api/cardgroupflashcards/"+props)
        .then(response => {
            const cards = response.data
            console.log("lmlmlml")
            console.log(cards)
            dispatch({type: "LOAD_CARDS", cards: cards})
        })
        .catch(err => console.log(err))
    }
    else {
        const cards = await axios.get("http://localhost:5000/api/flashcards")
            .then(response => {
                const cards = response.data
                console.log("mah cah")
                console.log(cards)
                dispatch({type: "LOAD_CARDS", cards: cards})
            })
            .catch(err => console.log(err))
    }

}

export const deleteCard = (card) => async (dispatch, getState) => {
    
    await axios.delete("http://localhost:5000/api/deleteflashcard/" + card.id, 
    {headers: { 
        Authorization: "Bearer " +localStorage.getItem("user_token") 
    }}
    ).then(res => {
        console.log(res.data)
        let alert = {severity: "success", text: "successfully deleted card"}
        dispatch({type: "ALERT", alert})  
        dispatch({type: "DELETE_CARD", card: card})        
    })
    .catch(err => {
        let alert = {severity: "error", text: err.toString() + " when attemting to delete card"}
        dispatch({type: "ALERT", alert})  
        dispatch({type: "DELETE_CARD_ERROR", card: card}) 
    })

}





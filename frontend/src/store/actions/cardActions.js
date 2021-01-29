
import axios from 'axios';

export const addCard = (card) => {
    return (dispatch, getState) => {
        
        axios.post("http://localhost:5000/api/addFlashcard", {
                title: card.title,
                content: card.content
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("user_token")
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch({type: "CREATE_CARD", card})
            })
            .catch(err => {
                dispatch({type: "CREATE_CARD_ERROR", err})
            })

        console.log("async call up in hier", card)
        dispatch({type: "CREATE_CARD", card: card})
    }
};


export const loadCards = () => async (dispatch, getState) => {
    const cards = await axios.get("http://localhost:5000/api/flashcards")
        .then(response => {
            const cards = response.data
            console.log("mah cah")
            console.log(cards)
            dispatch({type: "LOAD_CARDS", cards: cards})
        })
        .catch(err => console.log(err))

}

export const deleteCard = (card) => async (dispatch, getState) => {
    
    await axios.delete("http://localhost:5000/api/deleteflashcard/" + card.id, 
    {headers: { 
        Authorization: "Bearer " +localStorage.getItem("user_token") 
    }}
    ).then(res => {
        console.log(res.data)
    })

    dispatch({type: "DELETE_CARD", card: card})
}





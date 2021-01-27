
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



export const fetchCards = () => {
    return (dispatch) => {
        // dispatch()
        axios.get("http://localhost:5000/api/flashcards")
        .then(response => {
            console.log(response.data);
            const cards = response.data
            dispatch({type: "FETCH_CARD_SUCCESS", cards: cards})
        })
        .catch(err => console.log(err))
    }
}

export const deleteCard = (card) => {
    return(dispatch, getState) => {
        console.log("jalla")
    }
}


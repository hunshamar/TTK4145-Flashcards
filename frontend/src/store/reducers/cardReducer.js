
const initState = {
    alert: {},    
    cards: [
       
    ]
}

const cardReducer = (state = initState, action) => {
    switch(action.type) {
        case "CREATE_CARD":
            console.log("created ca22rd", action.createdCard)
            // alert(action.err)

            console.log(state)
            console.log({ 
                ...state,
                cards: [...state.cards, action.createdCard],
                alert: {success: "Successfully created card with id "+action.createdCard.id},
            })

            return { 
                ...state,
                cards: [...state.cards, action.createdCard],
                alert: {success: "Successfully created card with id "+action.createdCard.id},
            }
        case "CREATE_CARD_ERROR":
            return { 
                ...state,
                alert: {error: "Error creating card: "+action.err},

            }
            return state;
        case "LOAD_CARDS":
            console.log("got them cards", action.cards)
            console.log({...state, cards: action.cards})
            return {
                ...state, 
                cards: action.cards,
                alert: {}
            }
        case "DELETE_CARD":
            console.log("deleting dem cards")
            console.log(state.cards)
            console.log(state.cards.filter(card => card.id !== action.card.id))
           

            return { 
                ...state,
                cards: state.cards.filter((card) => card.id !== action.card.id),
                alert: {success: "Successfully deleted card with id "+action.card.id}
            }
            // return state;
        
        case "DELETE_CARD_ERROR":
            return { 
                ...state,
                alert: {error: "Could not delete card with id "+action.card.id}
            }
            // return state
        
        default:
            return state;
    }
}

export default cardReducer
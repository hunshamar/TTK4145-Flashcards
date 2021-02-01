
const initState = {
    cards: [
       
    ]
}

const cardReducer = (state = initState, action) => {
    switch(action.type) {
        case "CREATE_CARD":
            console.log("created card", action.card)
            return state;
        case "CREATE_CARD_ERROR":
            alert(action.err)
            return state;
        case "LOAD_CARDS":
            console.log("got them cards", action.cards)
            console.log({...state, cards: action.cards})
            return {...state, cards: action.cards}
        case "DELETE_CARD":
            console.log("deleting dem cards")
            console.log(state.cards)
            console.log(state.cards.filter(card => card.id !== action.card.id))
           

            return { 
                ...state,
                cards: state.cards.filter((card) => card.id !== action.card.id)
            }
            // return state;
        default:
            return state;
    }
}

export default cardReducer
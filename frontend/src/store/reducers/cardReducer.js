
const initState = {
    card: [
       
    ]
}

const cardReducer = (state = initState, action) => {
    switch(action.type) {
        case "CREATE_CARD":
            console.log("created card", action.card)
            return state;
        case "CREATE_CARD_ERROR":
            console.log("created card error", action.err)
            return state;
        case "LOAD_CARDS":
            console.log("got them cards", action.cards)
            return {...state, cards: action.cards}
        case "DELETE_CARD":
            console.log("deleting dem cards", action.card)
            return state;
        default:
            return state;
    }
}

export default cardReducer
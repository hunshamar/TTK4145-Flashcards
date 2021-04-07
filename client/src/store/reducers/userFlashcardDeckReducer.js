import {
  LOAD_USER_FLASHCARD_DECKS,
  LOAD_USER_FLASHCARD_DECK,
  DELETE_USER_FLASHCARD_DECK,
} from "../actionTypes";

const initState = {
  decks: [],
};

const userFlashcardDeckReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_USER_FLASHCARD_DECKS:
      console.log("successfull get", action.payload);
      return {
        ...state,
        decks: action.payload,
      };
    case LOAD_USER_FLASHCARD_DECK:
      console.log("successfull get", action.payload);
      return {
        ...state,
        decks: [...state.decks, action.payload],
      };
    case DELETE_USER_FLASHCARD_DECK:
      return {
        ...state,
        decks: state.decks.filter((deck) => deck.id !== action.payload.id),
      };

    default:
      console.log("default auth");
      return state;
  }
};

export default userFlashcardDeckReducer;

import axios from "axios";
import {
  SET_ALERT,
  CREATE_CARD,
  DELETE_CARD,
  DELETE_CARD_ERROR,
  LOAD_CARDS,
  LOAD_CARD,
  UPDATE_CARDS,
  SET_LOADING,
  CLEAR_CARDS,
  EDIT_CARD,
} from "../actionTypes";
import { refreshTokens } from "./authActions";

import { startLoading, endLoading } from "./loadingActions";
import { errorAlert, successAlert, infoAlert } from "./alertActions";

export const addCard = (card) => async (dispatch, getState) => {
  let success = false;
  await refreshTokens();

  await axios
    .post(
      "/api/currentuser/flashcards",
      {
        front: card.front,
        back: card.back,
        cardgroupid: card.cardgroupid,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    )
    .then((res) => {
      console.log("returned");
      console.log(res.data);
      if (res.data.error) {
        console.log("error");
        throw new Error(res.data.error);
      }

      const createdCard = res.data;
      dispatch({ type: CREATE_CARD, payload: createdCard });

      dispatch(successAlert("Successfully Created card alert"));
      success = true;

      //   let alert = { severity: "success", text: "successfully created card" };
      //   dispatch({ type: SET_ALERT, payload: alert });
    })
    .catch((err) => {
      console.log(err.toString());
      dispatch(errorAlert(err.toString()));
    });

  return success;
};

export const editCard = (card) => async (dispatch, getState) => {
  let success = false;
  await refreshTokens();
  console.log("carddd", card);

  await axios
    .put(
      "/api/currentuser/flashcards/" + card.id,
      {
        front: card.front,
        back: card.back,
        // cardgroupid: card.cardgroupid
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    )
    .then((res) => {
      console.log("returned");
      console.log(res.data);
      if (res.data.error) {
        console.log("error");
        throw new Error(res.data.error);
      }
      const changedCard = res.data;
      dispatch({ type: EDIT_CARD, payload: changedCard });
      dispatch(successAlert("successfully changed card"));
      success = true;
    })
    .catch((err) => {
      console.log("This is an error yes plz");
      console.log(err.toString());
      let alert = { severity: "error", text: err.toString() };
      dispatch({ type: SET_ALERT, payload: alert });
    });

  return success;
};

export const loadCardGroupUserFlashcards = (cardgroupId) => async (
  dispatch
) => {
  //   dispatch(startLoading())
  //   dispatch(startLoading());
  await refreshTokens();
  console.log("cardgroupid", cardgroupId);

  await axios
    .get(`/api/currentuser/flashcards/cardgroupid=${cardgroupId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    })
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      const cards = res.data;
      console.log("lmlmlml");
      console.log(cards);
      dispatch({ type: LOAD_CARDS, payload: cards });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });
};

export const loadCardgroupFlashcardsWithMinRating = (
  cardgroupId,
  minRating,
  removeduplicates
) => async (dispatch, getState) => {
  dispatch(startLoading());

  console.log("idd", cardgroupId);

  if (!cardgroupId) {
    dispatch({ type: LOAD_CARDS, payload: [] });
    dispatch(endLoading());
  } else {
    await refreshTokens();
    await axios
      .get(
        `/api/admin/cardgroup/${cardgroupId}/flashcards?minrating=${minRating}&removeduplicates=${removeduplicates}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      )
      .then((response) => {
        const cards = response.data;
        console.log("lmlmlml");
        console.log(cards);
        dispatch({ type: LOAD_CARDS, payload: cards });
      })
      .catch((err) => {
        dispatch(errorAlert(err.toString()));
      });
    dispatch(endLoading());
  }
};

export const loadCardgroupFlashcards = (cardgroupId) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());

  console.log("idd", cardgroupId);

  if (!cardgroupId) {
    dispatch({ type: LOAD_CARDS, payload: [] });
  } else {
    await refreshTokens();
    await axios
      .get(`/api/admin/cardgroup/${cardgroupId}/flashcards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      })
      .then((response) => {
        const cards = response.data;
        console.log("lmlmlml");
        console.log(cards);
        dispatch({ type: LOAD_CARDS, payload: cards });
      })
      .catch((err) => {
        dispatch(errorAlert(err.toString()));
      });
  }
  dispatch(endLoading());
};

export const loadPeerReviewFlashcards = (peerreviewid) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  await refreshTokens();

  await axios
    .get(`/api/peerreview/${peerreviewid}/flashcards`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
    .then((response) => {
      const cards = response.data;
      console.log("lmlmlml");
      console.log(cards);
      dispatch({ type: LOAD_CARDS, payload: cards });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

// export const getNextCardInUserDeck = (deckId) => async (dispatch, getState) => {
//   dispatch(startLoading());
//   await refreshTokens();
//   await axios
//     .get(`/api/currentuser/user-flashcard-decks/${deckId}/flashcard`, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("user_token"),
//       },
//     })
//     .then((response) => {
//       if (response.data.error) {
//         throw new Error(response.data.error);
//       }
//       const card = response.data;
//       console.log("response card");
//       console.log(card);
//       dispatch({ type: LOAD_CARD, payload: card });
//     })
//     .catch((err) => {
//       dispatch(errorAlert(err.toString()));
//     });

//   dispatch(endLoading());
// };

export const answerFlashcard = ({ deckId, flashcardId, correct }) => async (
  dispatch
) => {
  dispatch(startLoading());

  await refreshTokens();
  await axios
    .post(
      `/api/currentuser/user-flashcard-decks/${deckId}/flashcard/${flashcardId}/answer`,
      {
        correct: correct,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      }
    )
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      if (res.data.status === "complete") {
        return { status: "complete" };
      }

      const new_deck = res.data;
      dispatch({ type: LOAD_CARDS, payload: new_deck });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const getFlashcardsInUserDeck = (deckId) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  await refreshTokens();
  await axios
    .get(`/api/currentuser/user-flashcard-decks/${deckId}/flashcards`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      const card = response.data;
      console.log("response card");
      console.log(card);
      dispatch({ type: LOAD_CARDS, payload: card });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const getCollectiveDeckFlashcards = ({
  cardgroupIds = "all",
  difficultyMin = 0,
  difficultyMax = 10,
  numberOfCards = "all",
  idOnly = false,
} = {}) => async (dispatch, getState) => {
  dispatch(startLoading());
  await refreshTokens();

  console.log(typeof difficulties !== undefined);

  await axios
    .get(
      `/api/collective-deck/flashcards?cardgroup-id=${cardgroupIds}&difficulty-min=${difficultyMin}&difficulty-max=${difficultyMax}&ncards=${numberOfCards}${
        idOnly ? "&id-only=true" : ""
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    )
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const cards = response.data;
      console.log("lmlmlml");
      console.log(cards);
      dispatch({ type: LOAD_CARDS, payload: cards });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const clearCardReducer = () => (dispatch) => {
  console.log("alert tthh");
  dispatch({ type: CLEAR_CARDS });
};

export const deleteCard = (card) => async (dispatch, getState) => {
  await refreshTokens();

  console.log("del,", card);

  await axios
    .delete(`/api/currentuser/flashcards/${card.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      dispatch(successAlert());
      dispatch(successAlert("successfully deleted card"));
      dispatch({ type: DELETE_CARD, payload: card });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });
};

export const addCardsToCollectiveDeck = (flashcards) => async (
  dispatch,
  getState
) => {
  await refreshTokens();
  axios
    .post(
      "/api/admin/collective-deck/flashcards",
      {
        flashcards,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    )
    .then((res) => {
      console.log("returned hhh");
      console.log(res.data);
      if (res.data.error) {
        console.log("error");
        throw new Error(res.data.error);
      }

      const updatedCards = res.data;
      dispatch({ type: UPDATE_CARDS, payload: updatedCards });
      let alert = {
        severity: updatedCards.length ? "success" : "info",
        text: updatedCards.length + " cards added to collective deck ",
      };
      dispatch({ type: SET_ALERT, payload: alert });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });
};

export const removeCardsFromCollectiveDeck = (flashcards) => async (
  dispatch,
  getState
) => {
  await refreshTokens();
  axios
    .delete("/api/admin/collective-deck/flashcards", {
      data: { flashcards },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
    .then((res) => {
      console.log("returned hhh");
      console.log(res.data);
      if (res.data.error) {
        console.log("error");
        throw new Error(res.data.error);
      }

      const updatedCards = res.data;
      dispatch({ type: UPDATE_CARDS, payload: updatedCards });
      let alert = {
        severity: updatedCards.length ? "success" : "info",
        text: updatedCards.length + " cards removed from collective deck ",
      };
      dispatch({ type: SET_ALERT, payload: alert });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });
};

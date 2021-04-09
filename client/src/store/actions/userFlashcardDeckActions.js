import axios from "axios";
import {
  LOAD_USER_FLASHCARD_DECKS,
  LOAD_USER_FLASHCARD_DECK,
  SET_ALERT,
  SET_LOADING,
  DELETE_USER_FLASHCARD_DECK,
} from "../actionTypes";
import { refreshTokens } from "./authActions";

import { startLoading, endLoading } from "./loadingActions";
import { errorAlert, successAlert, infoAlert } from "./alertActions";

export const createUserFlashcardDeck = ({
  flashcards,
  title,
  nCards,
}) => async (dispatch) => {
  let success = false;

  await refreshTokens();
  await axios
    .post(
      "/api/currentuser/user-flashcard-decks",
      {
        flashcards,
        title,
        nCards,
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
      dispatch({ type: LOAD_USER_FLASHCARD_DECK, payload: res.data });
      dispatch(successAlert("Successfully created flashcard deck"));
      success = true;
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
  return success;
};

export const deleteUserFlashcardDeck = (id) => async (dispatch) => {
  dispatch(startLoading());

  await refreshTokens();
  await axios
    .delete("/api/currentuser/user-flashcard-decks/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    })
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("deleted", res.data);
      dispatch({ type: DELETE_USER_FLASHCARD_DECK, payload: res.data });
      dispatch(successAlert("Successfully deleted flashcard deck"));
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const getUserFlashcardDecks = ({ id } = {}) => async (dispatch) => {
  dispatch(startLoading());

  await refreshTokens();
  await axios
    .get(`/api/currentuser/user-flashcard-decks${id ? `?id=${id}` : ""}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    })
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("all decks", res.data);
      dispatch({ type: LOAD_USER_FLASHCARD_DECKS, payload: res.data });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

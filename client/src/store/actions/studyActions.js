import axios from "axios";
import {
  SET_ALERT,
  SET_LOADING,
  LOAD_CARDREVIEW_DECK,
  LOAD_CARDREVIEWS,
} from "../actionTypes";
import { refreshTokens } from "./authActions";

import { startLoading, endLoading } from "./loadingActions";
import { errorAlert, successAlert, infoAlert } from "./alertActions";

export const addCardsToDeck = () => async (dispatch) => {
  dispatch(startLoading());
  await refreshTokens();
  axios
    .post(
      "/api/currentuser/cardreviews",
      {},
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
      console.log("res alll", res.data);
      dispatch({ type: LOAD_CARDREVIEWS, payload: res.data });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const getCardreviewDeck = () => async (dispatch) => {
  dispatch(startLoading());
  await refreshTokens();
  axios
    .get("/api/currentuser/cardreviewdeck", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    })
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("res data alll", res.data);
      dispatch({ type: LOAD_CARDREVIEW_DECK, payload: res.data });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

import axios from "axios";
import {
  CREATE_RATING,
  LOAD_RATING,
  LOAD_RATINGS,
  SET_ALERT,
  SET_LOADING,
  UPDATE_DIFFICULTY_RATING,
  UPDATE_QUALITY_RATING,
} from "../actionTypes";
import { refreshTokens } from "./authActions";

import { startLoading, endLoading } from "./loadingActions";
import { errorAlert, successAlert, infoAlert } from "./alertActions";

export const saveQualityRating = (quality, ratingId) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  await refreshTokens();
  await axios
    .patch(
      "/api/currentuser/cardrating/" + ratingId + "/quality",
      {
        quality: quality,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    )
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("returned");
      console.log(res.data);

      const rating = res.data;

      dispatch({ type: UPDATE_QUALITY_RATING, payload: rating });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });
  dispatch(endLoading());
};

export const saveDifficultyRating = (difficulty, ratingId) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  await refreshTokens();
  await axios
    .patch(
      "/api/currentuser/cardrating/" + ratingId + "/difficulty",
      {
        difficulty: difficulty,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    )
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("returned");
      console.log(res.data);

      const rating = res.data;

      dispatch({ type: UPDATE_DIFFICULTY_RATING, payload: rating });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const saveDuplicatesRating = (duplicates, ratingId) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  await refreshTokens();
  await axios
    .patch(
      "/api/currentuser/cardrating/" + ratingId + "/duplicates",
      {
        duplicates: duplicates,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    )
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("returned");
      console.log(res.data);

      const ratings = res.data;

      dispatch({ type: LOAD_RATINGS, payload: ratings });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const saveRating = (rating, ratingId) => async (dispatch, getState) => {
  dispatch(startLoading());
  await refreshTokens();
  await axios
    .put(
      "/api/currentuser/cardrating/" + ratingId,
      {
        difficulty: rating.difficulty,
        quality: rating.quality,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    )
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("returned");
      console.log(res.data);

      const createdRating = res.data;

      console.log("was created, ", createdRating);
      dispatch({ type: CREATE_RATING, payload: createdRating });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  console.log("async call up in hier", rating);
  dispatch(endLoading());
};

export const getRating = (cardId) => async (dispatch, getState) => {
  // await refreshTokens()

  await axios
    .get("/api/currentuser/cardrating/" + cardId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("returned");
      console.log(res.data);

      if (res.data.status !== "no rating") {
        const foundRating = res.data;

        console.log("was found, ", foundRating);
        // let alert = {severity: "success", text: "Saved rating on card: "+cardNumber}
        // dispatch({type: SET_ALERT, payload: alert})
        dispatch({ type: CREATE_RATING, payload: foundRating });
      }
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  // console.log("async call up in hier", rating)
};

export const getRatingsInPeerreview = (peerreviewid) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  await refreshTokens();
  console.log("Is this ratings her ja");
  await axios
    .get("/api/currentuser/peerreview/" + peerreviewid + "/cardratings", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
    .then((res) => {
      console.log("hes");

      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("returned from ratings", res.data);

      const foundRatings = res.data;

      console.log("was found getratingsinpeererview, ", foundRatings);
      // let alert = {severity: "success", text: "Saved rating on card: "+cardNumber}
      // dispatch({type: SET_ALERT, payload: alert})
      dispatch({ type: LOAD_RATINGS, payload: foundRatings });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
  // console.log("async call up in hier", rating)
};

export const adminGetFlashcardRatings = (cardId) => async (dispatch) => {
  console.log("the id", cardId);

  await refreshTokens();

  await axios
    .get(`/api/admin/flashcard/${cardId}/cardratings`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log(res.data);
      dispatch({ type: LOAD_RATING, payload: res.data });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  // console.log("async call up in hier", rating)
};

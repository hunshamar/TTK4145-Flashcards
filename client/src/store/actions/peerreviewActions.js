import axios from "axios";
import {
  CREATE_PEERREVIEW,
  LOAD_PEERREVIEWS,
  SET_LOADING,
  SET_ALERT,
  GET_USER_ALL_PEERREVIEWS,
} from "../actionTypes";
import { refreshTokens } from "./authActions";

import { startLoading, endLoading } from "./loadingActions";
import { errorAlert, successAlert, infoAlert } from "./alertActions";

export const editPeerReview = ({ groupId, dueDate }) => async (
  dispatch,
  getState
) => {
  let success = false;
  dispatch(startLoading());
  await refreshTokens();
  await axios
    .put(
      "/api/admin/peerreviews",
      {
        groupId: groupId,
        dueDate: dueDate,
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
      success = res.data.status === "success";
      if (success) {
        dispatch(getUserPeerreviews());
        dispatch(successAlert("successfully created peerreviews"));
      }
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });
  dispatch(endLoading());
  return success;
};

export const deletePeerreview = (cardgroupId) => async (dispatch) => {
  await axios
    .delete(`/api/admin/cardgroup/${cardgroupId}/peerreview`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })

    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      if (res.data.status === "success") {
        dispatch(getUserPeerreviews());
        dispatch(
          successAlert("successfully deleted peerreviews and all ratings")
        );
      }
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const createPeerreviews = ({
  groupId,
  dueDate,
  numberOfReviews,
}) => async (dispatch, getState) => {
  let success = false;
  dispatch(startLoading());
  await refreshTokens();
  await axios
    .post(
      "/api/admin/peerreviews",
      {
        groupId: groupId,
        dueDate: dueDate,
        numberOfReviews: numberOfReviews,
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
      success = res.data.status === "success";
      if (success) {
        dispatch(getUserPeerreviews());
        dispatch(successAlert("successfully created peerreviews"));
      }
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
  return success;
};

export const getUserPeerreviews = () => async (dispatch, getState) => {
  dispatch(startLoading());
  await refreshTokens();

  await axios
    .get("/api/currentuser/peerreviews", {
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

      const peerReviews = res.data;
      console.log("was found, ", peerReviews);
      dispatch({ type: LOAD_PEERREVIEWS, payload: peerReviews });
      // let alert = {severity: "success", text: "successfully got peerreviews: "+peerReviews}
      // dispatch({type: SET_ALERT, payload: alert})
      // dispatch({type: CREATE_PEERREVIEW, payload: createdCardgroup})
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const loadPeerreview = (pid) => async (dispatch, getState) => {
  dispatch(startLoading());
  await refreshTokens();

  // await axios.get("http://localhost:5000/api/asd/fml")
  await axios
    .get("/api/currentuser/peerreview/" + pid, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })

    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("returne 1234", res.data);

      if (res.data.error) {
        console.log("error");
        throw new Error(res.data.error);
      }

      const peerreview = res.data;
      console.log("was found, ", peerreview);
      dispatch({ type: LOAD_PEERREVIEWS, payload: [peerreview] });
      // let alert = {severity: "success", text: "successfully got peerreviews: "+peerreview}
      // dispatch({type: SET_ALERT, payload: alert})
      // dispatch({type: CREATE_PEERREVIEW, payload: createdCardgroup})
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const getCardgroupPeerreviews = (cardgroupId) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());

  if (!cardgroupId) {
    dispatch({ type: LOAD_PEERREVIEWS, payload: [] });
  } else {
    await refreshTokens();
    await axios
      .get("/api/admin/peerreviews/" + cardgroupId, {
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

        if (res.data.error) {
          console.log("error");
          throw new Error(res.data.error);
        }

        const peerReviews = res.data;
        console.log("was found, ", peerReviews);
        dispatch({ type: LOAD_PEERREVIEWS, payload: peerReviews });
        // let alert = {severity: "success", text: "successfully got peerreviews: "+peerReviews}
        // dispatch({type: SET_ALERT, payload: alert})
        // dispatch({type: CREATE_PEERREVIEW, payload: createdCardgroup})
      })
      .catch((err) => {
        dispatch(errorAlert(err.toString()));
      });
  }

  dispatch(endLoading());
};

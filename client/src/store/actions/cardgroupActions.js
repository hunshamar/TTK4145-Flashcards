import axios from "axios";
import {
  SET_ALERT,
  CREATE_CARDGROUP,
  SET_LOADING,
  LOAD_CARDGROUPS,
  DELETE_CARDGROUP,
  DELETE_CARDGROUP_ERROR,
  LOAD_CARDGROUP,
  EDIT_CARDGROUP,
} from "../actionTypes";
import { refreshTokens } from "./authActions";
import { endLoading, startLoading } from "./loadingActions";
import { errorAlert, successAlert, infoAlert } from "./alertActions";

export const addCardgroup = (cardgroup) => async (dispatch, getState) => {
  let success = false;
  await refreshTokens();

  console.log("c cardgroup");
  console.log(cardgroup);

  await axios
    .post(
      "/api/admin/cardgroups",
      {
        title: cardgroup.title,
        numberOfCardsDue: cardgroup.numberOfCardsDue,
        dueDate: cardgroup.dueDate,
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

      const createdCardgroup = res.data;
      console.log(createdCardgroup.dueDate);

      console.log("was created, ", createdCardgroup);
      dispatch(successAlert("Successfully ceated cardgroup"));
      dispatch({ type: CREATE_CARDGROUP, payload: createdCardgroup });
      success = true;
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });
  return success;
};

export const editCardgroup = (cardgroup) => async (dispatch, getState) => {
  let success = false;
  await refreshTokens();

  console.log("we editing");

  await axios
    .put(
      `/api/admin/cardgroups/${cardgroup.id}`,
      {
        title: cardgroup.title,
        numberOfCardsDue: cardgroup.numberOfCardsDue,
        dueDate: cardgroup.dueDate,
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

      const editedCardgroup = res.data;

      dispatch(successAlert("successfully edited cardgroup: "));
      dispatch({ type: EDIT_CARDGROUP, payload: editedCardgroup });
      success = true;
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });
  console.log("returning true on edit cardgrup", success);
  return success;
};

export const loadCardgroupsInCollectiveDeck = () => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  await refreshTokens();

  await axios
    .get("/api/collective-deck/cardgroups", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
    .then((res) => {
      if (res.data.error) {
        console.log("error");
        throw new Error(res.data.error);
      }
      const cardgroups = res.data;
      console.log("mah cardgroups in collective deck");

      console.log(cardgroups);
      dispatch({ type: LOAD_CARDGROUPS, payload: cardgroups });
    })
    .catch((err) => console.log(err));

  dispatch(endLoading());
};

export const loadCardgroups = () => async (dispatch, getState) => {
  //   dispatch(startLoading())
  dispatch(startLoading());
  await refreshTokens();

  await axios
    .get("/api/cardgroups")
    .then((res) => {
      if (res.data.error) {
        console.log("error");
        throw new Error(res.data.error);
      }
      const cardgroups = res.data;
      console.log("mah cardgroups");

      console.log(cardgroups);
      dispatch({ type: LOAD_CARDGROUPS, payload: cardgroups });
    })
    .catch((err) => console.log(err));

  dispatch(endLoading());
  //   dispatch(endLoading())
};

export const loadCardgroup = (groupId) => async (dispatch) => {
  dispatch(startLoading());
  await refreshTokens();

  await axios
    .get("/api/cardgroups/" + groupId)
    .then((res) => {
      console.log("res,", res);
      if (res.data.error) {
        console.log("error");
        throw new Error(res.data.error);
      }
      const cardgroup = [res.data];
      console.log("cardgroup found");

      console.log(cardgroup);
      dispatch({ type: LOAD_CARDGROUP, payload: cardgroup });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });

  dispatch(endLoading());
};

export const deleteCardgroup = (cardgroup, name) => async (
  dispatch,
  getState
) => {
  await refreshTokens();
  console.log("and action");
  console.log(cardgroup.id);

  await axios
    .delete(
      "/api/admin/cardgroups/" + cardgroup.id + "?cardgroupname=" + name,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    )
    .then((res) => {
      console.log("to be deleted");
      if (res.data.error) {
        console.log("error");
        throw new Error(res.data.error);
      }

      dispatch(successAlert("successfully deleted cardgroup: "));
      dispatch({ type: DELETE_CARDGROUP, payload: cardgroup });
    })
    .catch((err) => {
      dispatch(errorAlert(err.toString()));
    });
};

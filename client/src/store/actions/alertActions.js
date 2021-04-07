import { SET_ALERT } from "../actionTypes";

export const infoAlert = (text) => ({
  type: SET_ALERT,
  payload: { severity: "info", text },
});

export const successAlert = (text) => ({
  type: SET_ALERT,
  payload: { severity: "success", text },
});

export const errorAlert = (text) => ({
  type: SET_ALERT,
  payload: { severity: "error", text },
});

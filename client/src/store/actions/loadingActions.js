import { SET_LOADING } from "../actionTypes";

export const startLoading = () => ({
  type: SET_LOADING,
  payload: true,
});

export const endLoading = () => ({
  type: SET_LOADING,
  payload: false,
});

import { SET_LOADING, STOP_LOADING } from "../actionTypes";

const initState = {
  loading: false,
};

const loadingReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADING:
      console.log("laading", action);
      return {
        loading: action.payload,
      };
    default:
      console.log("default alert");
      return state;
  }
};

export default loadingReducer;

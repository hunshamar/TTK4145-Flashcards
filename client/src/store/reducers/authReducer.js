import {
  LOG_IN_CALLBACK,
  LOG_IN_STATUS,
  LOG_OUT,
  SET_USERMODE,
} from "../actionTypes";

const initState = {
  loggedIn: false,
  loggedInUser: {},
  isAdmin: false,
  adminMode: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOG_IN_CALLBACK:
      console.log("successfull login callback");
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        isAdmin: action.payload.isAdmin,
        adminMode: action.payload.isAdmin,
      };

    case SET_USERMODE: // only avaliable for admin, to view page in user mode
      return {
        ...state,
        adminMode: !action.payload,
      };

    case LOG_OUT:
      console.log("logging out");

      console.log(action.payload);

      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        loggedInUser: action.payload.loggedInUser,
      };
    case LOG_IN_STATUS:
      console.log("fetching status");
      console.log(action.payload);
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        loggedInUser: action.payload.loggedInUser,
        isAdmin: action.payload.isAdmin,
        adminMode: action.payload.isAdmin,
      };

    default:
      console.log("default auth");
      return state;
  }
};

export default authReducer;

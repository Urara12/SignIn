import { createStore } from "redux";

const initialState = {
  email: "",
  userId: "",
  userName: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return {
        ...state,
        email: action.email,
      };
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.userName,
      };
    case "SET_USERID":
      return {
        ...state,
        userId: action.userId,
      };
    // case "SET_TARGET_ARTIST":
    //   return {
    //     ...state,
    //     targetArtistObj: action.targetArtistObj,
    //   };
    default:
      return state;
  }
};

const store = createStore(reducer);

export { store };

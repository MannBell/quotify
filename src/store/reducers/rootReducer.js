import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import quoteReducer from "./quoteReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  auth: authReducer
  , quoteState: quoteReducer
  , modal: modalReducer
  , firebase: firebaseReducer
  , firestore: firestoreReducer
  // to keep track of location
  , location: () => window.location.hash.replace(/\#\//, "")
});

export default rootReducer;
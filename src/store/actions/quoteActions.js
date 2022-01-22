import { v4 as uuidv4 } from "uuid";

export const createQuote = (quote) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
  
    const { auth: { uid: myUid }, profile } = getState().firebase;
    const quoteId = uuidv4();

    firestore
    .collection("quotes")
    .doc(myUid)
    .collection("quotes")
    .doc(quoteId)
    .set({
      ...quote
      , id: quoteId
      , creator: {
          id: myUid
          , firstname: profile.firstname
          , lastname: profile.lastname
        }
      , createdAt: new Date()
      , rating: {}
    })
    .then(() => {
      dispatch({
        type: "CREATE_QUOTE_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "CREATE_QUOTE_ERROR"
        , err
      })
    })
  };
}

export const rateQuote = ({ creator, quoteId, rating }) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
  
    const { auth: { uid: myUid } } = getState().firebase;

    firestore
    .collection("quotes")
    .doc(creator.id)
    .collection("quotes")
    .doc(quoteId)
    .update({ [`rating.${myUid}`]: rating })
    .then(() => {
      dispatch({
        type: "RATE_QUOTE_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "RATE_QUOTE_ERROR"
        , err
      })
    })
  };
}

export const deleteQuote = (quoteId) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
  
    const { auth: { uid: myUid } } = getState().firebase;

    firestore
    .collection("quotes")
    .doc(myUid)
    .collection("quotes")
    .doc(quoteId)
    .set({})
    .then(() => {
      dispatch({
        type: "DELETE_QUOTE_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "DELETE_QUOTE_ERROR"
        , err
      })
    })
  };
}
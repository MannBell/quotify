import React from 'react';
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
// Components
import MyQuotes from '../lists/MyQuotes';
// Actions
import { rateQuote, deleteQuote } from "../../store/actions/quoteActions";
import { showModal } from "../../store/actions/modalActions";

const Profile = (props) => {

  if(!props.firebaseAuth.uid) return <Redirect to="/"/>
  
  const {
    firebaseAuth: { uid: myUid }
    , match: { params: { id: profileId } }
    , quotes: firestoreQuotes
    , users
    // Actions
    , rateQuote
    , deleteQuote
    , showModal
  }=props;

  const isMyProfile = profileId === myUid;
  const { firstname, lastname } = isLoaded(users) && !isEmpty(users) 
                                    ? users[profileId]
                                    : {firstname:"...", lastname:"..."};

  return (
    <main className="nav-margin bg-secondary mb-5">
      <div className="container">
        <div className="pt-3">
          <section style={{ maxWidth:"max-content" }} className="card ms-auto bg-dark mb-5">
            <div className="card-body d-flex align-items-center justify-content-end">
              <div className="h1 bg-light nav-link initials-circle initials-circle-lg text-dark rounded-circle d-flex justify-content-center align-items-center mb-0 me-2">
                {`${firstname[0]}${lastname[0]}`}
              </div>
              <h1 className="card-title text-light p-2">
                {firstname} {lastname}
              </h1>
            </div>
          </section>
          <MyQuotes
            cardTitle={`${isMyProfile ? "My " : ""}Quotes`}
            firestoreQuotes={firestoreQuotes}
            myUid={myUid}
            // Actions
            rateQuote={rateQuote}
            deleteQuote={deleteQuote}
            showModal={showModal}
          />
        </div>
      </div>
    </main>
  )
}

const mapStateToProps = ({ firebase: { auth: firebaseAuth }, firestore: { data: { quotes, users } } }) => ({
  firebaseAuth
  , quotes
  , users
});

const mapDispatchToProps = (dispatch) => ({
  rateQuote: (rateObj) => dispatch(rateQuote(rateObj))
  , deleteQuote: (quoteId) => dispatch(deleteQuote(quoteId))
  , showModal: (content, params) => dispatch(showModal(content, params))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  , firestoreConnect(({ match: { params: { id: profileId } }, firebaseAuth: { uid } }) => {

    return uid // check "uid" to prevent error
      ? ([
          { collection: "users", doc: profileId }
          ,
          {
            collection: "quotes"
            , doc: profileId
            , subcollections: [
              {
                collection: "quotes"
              }
            ]
            , storeAs: "quotes"
          }
        ])
      : []
  })
)(Profile);
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
// Components
import QuoteControlBrowser from "../quote/QuoteControlBrowser";
// Actions
import { rateQuote, deleteQuote } from "../../store/actions/quoteActions";
import { showModal } from "../../store/actions/modalActions";
// Functions
import spreadObj from "../../myPlugins/functions/spreadObj";
import spreadObjsInArr from "../../myPlugins/functions/spreadObjsInArr";
import sortRating from "../../myPlugins/functions/sortRating";
import cleanFalsy from "../../myPlugins/functions/cleanFalsy";


class Browse extends Component {

  state={ sortBy: "random" }

  handleSorting = ({ target }) => {
    this.setState({ sortBy: target.value })
  }

  render() {

    if(!this.props.firebaseAuth.uid) return <Redirect to="/"/>

    const {
      firebaseAuth
      , firestoreData
      , quoteState
      // Actions
      , rateQuote
      , deleteQuote
      , showModal
      , resetQuoteCreateStatus
    } = this.props;

    // To reset the "createQuoteSuccess" if quote got created successfully
    if(quoteState.createQuoteSuccess) resetQuoteCreateStatus();

    // "delete firestoreData.quotes" to not cause interference if "firestoreData.quotes" preserved from "Profile.js"
    const rawQuotes = ((firestoreData)=>{ delete firestoreData.users; delete firestoreData.quotes; return firestoreData;})({...firestoreData});

    // "!isEmpty(rawQuotes)" ; new users initialize their quotes collection, so if it is empty, quotes are not loaded yet
    const quotes = isLoaded(rawQuotes) && !isEmpty(rawQuotes)
                    ? ((quotes)=>{
                        switch(this.state.sortBy) {
                          case "high"
                          : return sortRating(quotes);
                          case "low"
                          : return sortRating(quotes, { asc: true });
                          default
                          : return quotes
                        }
                      })(cleanFalsy(spreadObjsInArr(spreadObj(rawQuotes))))
                    : undefined;
    
    return (
      <div className="p-sm-5 nav-margin mb-5">
        <div className="container container-small">
          <div className="d-flex justify-content-end">
            <div className="input-group mb-3 d-flex justify-content-end">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="sortBy">
                Browse<i className="fas fa-sort-amount-down ms-2"></i></label>
              </div>
              <select id="sortBy" onChange={this.handleSorting} className="custom-select">
                <option value="random">Randomly</option>
                <option value="high">High rated first</option>
                <option value="low">low rated first</option>
              </select>
            </div>
          </div>
          <QuoteControlBrowser
            quotes={ quotes }
            myUid={ firebaseAuth.uid }
            sortBy={ this.state.sortBy }
            // Actions
            rateQuote={ rateQuote }
            deleteQuote={ deleteQuote }
            showModal={ showModal }
          />
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ firebase: { auth: firebaseAuth }, firestore: { data: firestoreData }, quoteState }) => {
  return ({
    firebaseAuth
    , firestoreData
    , users: firestoreData.users
    , quoteState
  });
};

const mapDispatchToProps = (dispatch) => ({
  resetQuoteCreateStatus: () => dispatch({ type: "CREATE_QUOTE_STATUS_RESET" })
  , rateQuote: (rateObj) => dispatch(rateQuote(rateObj))
  , deleteQuote: (quoteId) => dispatch(deleteQuote(quoteId))
  , showModal: (content, params) => dispatch(showModal(content, params))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  , firestoreConnect(({users}) => {

      return isLoaded(users) && !isEmpty(users) // make sure it's loaded and not null
        ? [{collection:"users"}, ...Object.keys(users).map((userId) => {
            return (
              {
                collection: "quotes"
                , doc: userId
                , subcollections: [
                  { collection: "quotes" }
                ]
                , storeAs: userId
              }
            );
        })]
        : [{collection:"users"}];
  })
)(Browse);
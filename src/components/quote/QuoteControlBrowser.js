import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
// Components
import QuoteControl from "../quote/QuoteControl";
// Functions
import mod from "../../ex_plugins/functions/mod";

export class QuoteControlBrowser extends Component {
  state={
    sortBy: "random"
    , browseIndex: 0
  }

  changeBrowseIndex = (n) => {
    this.setState((state) =>({ browseIndex: state.browseIndex + n }))
  }

  render() {
    if(this.props.sortBy !== this.state.sortBy){
      this.setState({ browseIndex:0, sortBy: this.props.sortBy })
    }
    
    const { browseIndex } = this.state;
    const {
      quotes
      , myUid
      , rateQuote
      , deleteQuote
      , showModal
    } = this.props;

    return isLoaded(quotes)
            ? isEmpty(quotes)
              ? <p>We have no quotes yet!</p>
              : (
                <QuoteControl
                  changeBrowseIndex={ quotes.length > 1 && this.changeBrowseIndex }
                  // used modulo below "mod()", to start again if end is reached
                  quote={ quotes[mod(browseIndex, quotes.length)] }
                  myUid={ myUid }
                  // Actions
                  rateQuote={ rateQuote }
                  deleteQuote={ deleteQuote }
                  showModal={ showModal }
                />
              )
            : (
              <div className="mt-5 d-block text-center">
                <span className="text-dark spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                <span className="sr-only">Loading...</span>
              </div>
            )
  }
}

export default QuoteControlBrowser;
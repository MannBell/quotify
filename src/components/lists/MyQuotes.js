import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
// Components
import QuoteControl from "../quote/QuoteControl";
// Functions
import sortRating from "../../myPlugins/functions/sortRating";
import cleanFalsy from "../../myPlugins/functions/cleanFalsy";
import spreadObj from "../../myPlugins/functions/spreadObj";

class MyQuotes extends Component {

  state={
    sortBy: "random"
  }

  handleSorting = ({target}) => this.setState({sortBy: target.value});

  render() {

    const {
      firestoreQuotes: rawQuotes
      , cardTitle
      , myUid
      // Actions
      , rateQuote
      , deleteQuote
      , showModal
    } = this.props;

    const myQuotes = isLoaded(rawQuotes)
                      ? ((quotes)=>{
                          switch(this.state.sortBy) {
                            case "high"
                            : return sortRating(quotes);
                            case "low"
                            : return sortRating(quotes, { asc: true });
                            default
                            : return quotes
                          }
                        })(cleanFalsy(spreadObj(rawQuotes)))
                      : undefined;

    return (
      <section className="card bg-dark">
          <div className="card-body">
            <h2 className="card-title text-light pb-3">
              <i className="fas fa-feather-alt"></i> { cardTitle }
            </h2>
            <div className="input-group mb-3 d-flex justify-content-end">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="sortBy">
                Sort By<i className="fas fa-sort-amount-down ms-2"></i></label>
              </div>
              <select id="sortBy" onChange={this.handleSorting} className="custom-select">
                <option value="random">Randomly</option>
                <option value="high">High rated first</option>
                <option value="low">low rated first</option>
              </select>
            </div>
            <div className="row g-3 g-lg-5">
              {
                isLoaded(myQuotes)
                  ? isEmpty(myQuotes)
                    ? <div className="text-light">You have no quotes yet...</div>
                    : myQuotes.map((quote)=>(
                        <div key={quote.id} className="col-12 col-md-6">
                          <QuoteControl
                            quote={quote}
                            myUid={myUid}
                            rateQuote={rateQuote}
                            deleteQuote={deleteQuote}
                            showModal={showModal}
                          />
                        </div>
                    ))
                  : <div className="mt-5 d-block text-center">
                      <span className="text-light spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                      <span className="sr-only">Loading...</span>
                    </div>
              }
            </div>
          </div>
        </section>
    )
  }
}

export default MyQuotes;
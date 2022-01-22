import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
// ACTIONS
import { createQuote } from "../../store/actions/quoteActions";

class CreateQuote extends Component {
  
  state = {
    quote: {
      text: ""
      , author: ""
    }
    , loading: false
    , iAmAuthor: false
  }

  handleChange = ({ target: { id, value } }) => {
    this.state.loading && this.setState({ loading: false });

    if(id==="iAmAuthor") {
      this.setState((state) => ({
        [id]: !state[id]
      }));
    } else {
      this.setState((state) => ({
        quote: { ...state.quote, [id]: value } 
      }));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { createQuote, clearError, firebaseProfile: { firstname, lastname } }=this.props;
    clearError("CLEAR_CREATE_QUOTE_ERROR");
    
    const { quote, iAmAuthor }=this.state;
    const author = iAmAuthor ? `${firstname} ${lastname}` : quote.author;
    createQuote({...quote, author});
    this.setState({ loading: true });
  }

  render() {

    if(!this.props.firebaseAuth.uid) return <Redirect to="/"/>

    const { quoteState: { createQuoteSuccess, createQuoteErr } } = this.props;
    // If post has been created successfully, redirect to /browse
    if(createQuoteSuccess) return <Redirect to="/browse" />;

    const { iAmAuthor, loading } = this.state;

    return (
      <div className="nav-margin p-sm-5 mb-5">
        <div className="container container-small">
          <form onSubmit={this.handleSubmit} className="card form">
            <div className="card-body">
              <h1 className="text-dark card-title pb-5">Create a New Quote</h1>
              {/* <!-- Text --> */}
              <label className="text-dark form-label lead" htmlFor="text">Quote:</label>
              <textarea onChange={this.handleChange} required className="mb-3 form-control" id="text"></textarea>
              {/* <!-- Author -->  */}
              <label className="text-dark form-label lead" htmlFor="author">Author:</label>
              <div className="form-check form-switch">
                <input onChange={this.handleChange} className="form-check-input" type="checkbox" id="iAmAuthor"/>
                <p className="form-check-label">I am the author</p>
              </div>
              {
                !iAmAuthor && <input onChange={this.handleChange} required className="mb-3 form-control" type="text" id="author"/>
              }
              <div className="d-flex">
                <button className="ms-auto my-3 btn-lg btn btn-warning px-sm-5" type="submit">
                  Create
                  {
                    loading && !createQuoteErr
                    &&
                    (
                      <span className="ms-3">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="sr-only">Loading...</span>
                      </span>
                    )
                  }
                </button>
              </div>
              {
                createQuoteErr
                &&
                <p className="text-danger text-center">
                  {createQuoteErr}
                </p>
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ quoteState, firebase: { auth: firebaseAuth, profile: firebaseProfile } }) => {
  return ({ quoteState, firebaseAuth, firebaseProfile });
}

const mapDispatchToProps = (dispatch) => ({
  createQuote: (quote) => dispatch(createQuote(quote))
  , resetcreateQuoteStatus: () => dispatch({ type: "CREATE_QUOTE_STATUS_RESET" })
  , clearError: (type) => dispatch({ type })
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuote);
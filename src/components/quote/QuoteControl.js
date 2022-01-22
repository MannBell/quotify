import React from 'react';
import { Link } from "react-router-dom";
import { isLoaded } from "react-redux-firebase";
import Moment from "moment";
// Functions
import getRatingFromObj from '../../myPlugins/functions/getRatingFromObj';

const QuoteControl = (props) => {
  const {
    changeBrowseIndex
    , quote
    , myUid
    // Actions
    , rateQuote
    , deleteQuote
    , showModal
  } = props;

  const {
    id
    , text
    , author
    , rating: ratingObj
    , creator
    , createdAt
  }=isLoaded(quote) && quote;

  const rating = isLoaded(ratingObj) && getRatingFromObj(ratingObj);

  return (
    <section className="card h-100">
      <div className="card-header d-flex justify-content-between">
        {
          changeBrowseIndex
          &&
          <button
            className="btn btn-warning"
            onClick={changeBrowseIndex.bind(this, -1)}
          ><i className="fas fa-arrow-left me-3"></i>Prev</button>
        }
        {
          creator.id === myUid
          &&
          (
            <button
              className="mx-auto btn btn-danger"
              onClick={
                showModal.bind(
                  this
                  , "You are about to delete the quote that you created!"
                  , {
                      sideFunction: deleteQuote.bind(this, id)
                      , danger: true
                      , choice: true
                    }
                )
              }
            ><span className="d-none d-sm-inline">Delete</span><i className="fas fa-trash ms-sm-3"></i>
            </button>
          )
        }
        {
          changeBrowseIndex
          &&
          <button
            className="btn btn-warning"
            onClick={changeBrowseIndex.bind(this, 1)}
          >Next<i className="fas fa-arrow-right ms-3"></i>
          </button>
        }
      </div>
      <div className="card-body">
        <h1 className="py-5 text-center mb-0">{text}</h1>
        <em className="d-flex justify-content-end text-secondary">-{author}-</em>
      </div>
      <div className="card-footer bg-dark">
        <div className="row">
          <div className="col">
            <div>
              <span className="text-secondary">Your rate: </span>
              <div className="d-inline-block">
                {
                  [1, 2, 3, 4, 5].map((num) => {
                    const less = num <= (ratingObj[myUid] || 0);
                    return (
                      <button
                        key={num}
                        onClick={rateQuote.bind(this, { rating: num, quoteId: id, creator })}
                        className={`my-star h5 text-${less ? "warning" : "secondary"}`}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    );
                  })
                }
              </div>
            </div>
            <p className="m-0 text-secondary">
              Overall rate: {rating}/5
            </p>
          </div>
          <div className="col d-flex justify-content-end">
            <p className="m-0 text-secondary"><span className="me-2">Posted By:</span>
              <Link className="text-warning" to={`/profile/${ creator.id }`}>
                { creator.firstname } { creator.lastname }
              </Link>
              <br/>
              Date: { Moment(createdAt.toDate()).calendar() }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuoteControl;
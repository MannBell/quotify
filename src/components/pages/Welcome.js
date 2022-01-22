import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import Typed from "typed.js";
// Components
import WelcomeCard from "../cards/WelcomeCard";
// Constants
import { heroImg } from "../../myPlugins/constants/links";
import { cards } from "../../myPlugins/constants/welcomeCards";

class Welcome extends Component {

  componentDidMount() {
    const options = {
      strings: [
        "Read Quotes"
        , "Create Quotes"
        , "Rate Quotes"
        , "Read Quotes, Create Quotes, Rate Quotes"
      ]
      , typeSpeed: 40
      , backSpeed: 40
    }
    // make sure `this.typedEl` is not `undefined`
    this.typed = this.typedEl && new Typed(this.typedEl, options);
  }

  render() {
    if(this.props.firebaseAuth.uid) return <Redirect to="/browse"/>

    return (
      <main className="my-5">
        {/* <!-- Showcase --> */}
        <section
          className="py-5 p-sm-5 pb-md-0 text-light"
          style={{background: "linear-gradient(to top, var(--bs-warning), #0000)"}}
        >
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div style={{ maxWidth: "420px" }} className="d-none d-md-block col-md mb-5 mb-md-0 mx-auto mx-md-0">
                <img src={ heroImg } alt="" className="img-fluid" />
              </div>
              <div className="col-md text-center text-md-start">
                <h1 style={{height:"7rem"}} className="mb-5 text-warning">
                  Quotify<i className="fas fa-feather-alt"></i><br/>-Inspire &amp; Get Inspired-
                </h1>
                <h2 style={{height:"5rem"}} className="text-light mb-4">
                  <span ref={ (el) => { this.typedEl = el; } }></span>
                </h2>
                <Link to="/signup" className="btn btn-lg btn-dark text-warning">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- About --> */}
        <section id="about" className="py-5 p-sm-5 bg-dark">
          <div className="container">
            <div className="row gy-5 g-sm-5">
              {
                cards.map(({ title, content, icon }, i) => {
                  return (
                    <WelcomeCard
                      key={ i }
                      title={ title }
                      content={ content }
                      icon={ icon }
                    />
                  );
                })
              }
            </div>
          </div>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ firebase: { auth: firebaseAuth } }) => ({
  firebaseAuth
});

export default connect(mapStateToProps)(Welcome);
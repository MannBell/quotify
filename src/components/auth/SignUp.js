import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
// ACTIONS
import { signUp } from "../../store/actions/authActions";

class SignUp extends Component {

  state = {
    email: ""
    , password: ""
    , loading: false
  }

  handleChange = (e) => {
    this.state.loading && this.setState({ loading: false });
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { clearError, signUp } = this.props;
    clearError("CLEAR_SIGN_UP_ERROR");
    signUp(this.state);
    this.setState({ loading: true });
  }

  render() {

    if(this.props.firebaseAuth.uid) return <Redirect to="/browse"/>

    return (
      <div className="p-sm-5 nav-margin mb-5">
        <div className="container container-small">
          <form
            onSubmit={ this.handleSubmit }
            className="card form"
          >
            <div className="card-body">
              <h1 className="card-title pb-5">Sign Up:</h1>
              {/* <!-- Firstname --> */}
              <label className="form-label lead" htmlFor="firstname">Firstname:</label>
              <input required onChange={ this.handleChange } className="mb-3 form-control" type="text" id="firstname"/>
              {/* <!-- Lastname --> */}
              <label className="form-label lead" htmlFor="lastname">Lastname:</label>
              <input required onChange={ this.handleChange } className="mb-3 form-control" type="text" id="lastname"/>
              {/* <!-- Email --> */}
              <label className="form-label lead" htmlFor="email">Email:</label>
              <input required onChange={ this.handleChange } className="mb-3 form-control" id="email" type="email"/>
              {/* <!-- Password --> */}
              <label className="form-label lead" htmlFor="password">Password:</label>
              <input required onChange={ this.handleChange } className="mb-3 form-control" id="password" type="password"/>
              {/* <!-- Button --> */}
              <div className="d-flex">
                <button className="ms-auto my-3 btn-lg btn btn-warning text-dark" type="submit">
                  Sign Up
                  {
                    this.state.loading && !this.props.signUpErr
                    &&
                    <span className="ms-2">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="sr-only">Loading...</span>
                    </span>
                  }
                </button>
              </div>
              { this.props.signUpErr && <p className="text-danger text-center">{ this.props.signUpErr }</p> }
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ firebase, auth }) => ({
  firebaseAuth: firebase.auth
  , signUpErr: auth.signUpErr
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (newUser) => dispatch(signUp(newUser))
  , clearError: (type) => dispatch({ type })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
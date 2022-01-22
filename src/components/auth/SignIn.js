import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
// ACTIONS
import { signIn } from "../../store/actions/authActions";

class SignIn extends Component {

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
    const { clearError, signIn } = this.props;
    clearError("CLEAR_SIGN_IN_ERROR");
    signIn(this.state);
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
              <h1 className="card-title pb-5">Sign In:</h1>
              {/* <!-- Email --> */}
              <label className="form-label lead" htmlFor="email">Email:</label>
              <input required onChange={ this.handleChange } className="mb-3 form-control" id="email" type="email"/>
              {/* <!-- Password --> */}
              <label className="form-label lead" htmlFor="password">Password:</label>
              <input required onChange={ this.handleChange } className="mb-3 form-control" id="password" type="password"/>
              {/* <!-- Button --> */}
              <div className="d-flex">
                <button className="ms-auto my-3 btn-lg btn btn-warning text-dark" type="submit">
                  Sign In
                  {
                    this.state.loading && !this.props.signInErr
                    &&
                    <span className="ms-2">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="sr-only">Loading...</span>
                    </span>
                  }
                </button>
              </div>
              { this.props.signInErr && <p className="text-danger text-center">{ this.props.signInErr }</p> }
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ firebase, auth }) => ({
  firebaseAuth: firebase.auth
  , signInErr: auth.signInErr
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (newUser) => dispatch(signIn(newUser))
  , clearError: (type) => dispatch({ type })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
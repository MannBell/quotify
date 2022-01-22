import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// COMPONENTS
import GuestModal from "../modals/GuestModal";
// ACTIONS
import { signIn, signOut } from "../../store/actions/authActions";

const Navbar = (props) => {

  const {
    firebaseAuth
    , firebaseProfile: { firstname, lastname, isLoaded: isLoadedProfile, isEmpty: isEmptyProfile }
    , location
    // Actions
    , signIn
    , signOut
  } = props;

  const page = location.length && location.match(/\w+(?=\/)?/)[0];

  return (
    <div>
      <nav className="fixed-top navbar navbar-expand-md navbar-dark bg-dark lead">
        <div className="container">
          <Link to="/" className="text-warning navbar-brand">
            Quotify<i className="fas fa-feather-alt"></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {
            firebaseAuth.uid
              ? (
                  <div id="navmenu" className="collapse navbar-collapse text-center text-md-start">
                    <ul className="d-flex align-items-center justify-content-between navbar-nav text-secondary ms-auto">
                      <li className="nav-item">
                        <Link to="/browse" className={`lead nav-link text-${page === "browse" ? "light" : "secondary"}`}>
                          <i className="fas fa-search"></i> Browse
                        </Link>
                      </li>
                      <li className="nav-item mx-md-2 mx-lg-5">
                        <Link to="/create" className={`lead nav-link text-${page === "create" ? "light" : "warning"}`}>
                        Create Quote <i className="fas fa-pencil-alt"></i>
                        </Link>
                      </li>
                      {
                        isLoadedProfile
                          ? isEmptyProfile
                            ? null
                            : (
                                <li className="nav-item d-flex align-items-center py-2 py-md-0">
                                  <Link to={`/profile/${firebaseAuth.uid}`} className={`bg-${page === "profile" ? "light" : "secondary"} nav-link initials-circle text-dark rounded-circle d-flex justify-content-center align-items-center me-2`}>
                                    {firstname[0]}{lastname[0]}
                                  </Link>
                                  <Link className={`nav-link text-${page === "profile" ? "light" : "secondary"}`} to={`/profile/${firebaseAuth.uid}`}>View Profile</Link>
                                </li>
                              )
                          : <div className="spinner-border text-primary"></div>
                      }
                      <li>
                        <span
                          onClick={ signOut }
                          style={{cursor: "pointer"}}
                          className="text-danger cursor-pointer ms-md-2 ms-lg-5"
                        >
                          Sign Out <i className="fas fa-sign-out-alt"></i>
                        </span>
                      </li>
                    </ul>
                  </div>
              )
              : (
                  <div id="navmenu" className="collapse navbar-collapse text-center text-md-start">
                    <ul className="d-flex align-items-center justify-content-between navbar-nav text-secondary ms-auto">
                      <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                          Sign Up
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/signin" className="nav-link">
                          Sign In
                        </Link>
                      </li>
                      <li className="nav-item">
                        <button
                          type="button"
                          className="ms-md-3 mt-3 mt-md-0 btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#guestModal"
                        >Guest?!</button>
                      </li>
                    </ul>
                  </div>
              )
          }
        </div>
      </nav>
      <GuestModal signIn={signIn} myUid={firebaseAuth.uid}/>
    </div>
  )
}

const mapStateToProps = ({ firebase, location }) => ({
  firebaseAuth: firebase.auth
  , firebaseProfile: firebase.profile
  , location
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
  , signIn: (newUser) => dispatch(signIn(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
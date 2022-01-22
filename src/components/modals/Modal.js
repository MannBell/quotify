import React from 'react';
import { connect } from "react-redux";
// ACTIONS
import { hideModal } from "../../store/actions/modalActions";

const Modal = ({ active, content, hideModal, params }) => {
  
  const {
    danger
    , sideFunction
    , choice
  } = Boolean(params) && params;// Boolean because undefined causes error

  const handleClick = () => {
    sideFunction && sideFunction();
    hideModal();
  }

  const cancel = () => {
    hideModal();
  }

  return (
    <div className={`my-modal-wrapper${ active ? " active" : "" }${ danger ? " text-danger" : "" }`}>
      <div className="card">
        <div className="card-body text-center">
          <p className={`text-${ danger ? "danger" : "primary" }`}>
            <i className={`fas fa-${ danger ? "exclamation-triangle" : "info-circle" }`}></i>
          </p>
          <p className="lead">{ content }</p>
          <div className="d-flex justify-content-between">
            <button
              className={`btn btn-lg btn-${danger ? "danger" : "primary"}`} 
              onClick={ handleClick }
            >
              {danger ? "Yes, i understand." : "Ok"}</button>
            { choice && <button className="ms-3 btn btn-lg btn-secondary" onClick={ cancel }>cancel</button> }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { active, content, params } = state.modal;
  return ({ active, content, params });
};

const mapDispatchToProps = (dispatch) => ({ hideModal: () => dispatch(hideModal()) });

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
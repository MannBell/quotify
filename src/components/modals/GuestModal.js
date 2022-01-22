import React, { Component } from 'react';

class GuestModal extends Component {

  state={
    loading: false
  }

  render(){

    // To close modal if sign in success
    this.modalCloseBtn && this.props.myUid && (()=>{
      this.modalCloseBtn.click();
    })()

    return (
      <div className="modal fade" id="guestModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-warning"><i className="fas fa-user-tie me-2"></i>Guest</h5>
              <button
                ref={ (el) => { this.modalCloseBtn = el; } }
                type="button"
                className="close btn btn-sm btn-warning"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="lead text-center mb-0">You just want to have a quick visit and test the app? Please click on the button below to Sign In as a Guest.</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={()=>{
                  this.props.signIn({ email:"guest@example.com", password:"GuestPassword" });
                  this.setState({ loading:true });
                }}
                className="mx-auto btn-lg btn btn-warning text-dark"
              >
                Sign In As Guest
                {
                  this.state.loading
                  &&
                  <span className="ms-2">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Loading...</span>
                  </span>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GuestModal;
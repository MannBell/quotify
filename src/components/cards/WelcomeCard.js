import React from 'react';

const WelcomeCard = ({ title, content, icon }) => {
  return (
    <div className="col-md">
      <div className="h-100 card text-center">
        <div className="card-body">
          <div className="h1">
            <i className={ icon }></i>
          </div>
          <h3 className="card-title">
            { title }
          </h3>
          <p className="card-text">
            { content }
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeCard;
import React from 'react';
import './Forgot.css';

function Forgot({ goToLogin }) {
  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Find your account</h2>
        <p>Please enter your email or mobile number to search for your account.</p>

        <input
          type="text"
          placeholder="Email or mobile number"
          className="input-field"
        />

        <div className="button-group">
          {}
          <button className="cancel-button" onClick={goToLogin}>
            Cancel
          </button>
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
}

export default Forgot;

import React, { useState } from 'react';
import './App.css';
import Register from './Register';
import Forgot from './Forgot';
import Homepage from './Homepage';

function App() {
  const [view, setView] = useState('login'); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const goToLogin = () => {
    setIsAuthenticated(false);
    setView('login');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setView('homepage'); 
  };

  return (
    <div>
      {view === 'register' ? (
        <Register goToLogin={goToLogin} />
      ) : view === 'forgot' ? (
       
        <Forgot goToLogin={goToLogin} />
      ) : view === 'homepage' && isAuthenticated ? (
       
        <Homepage goToLogin={goToLogin} />
      ) : (
      
        <div className="container">
          <div className="left">
            <h1 className="title">Fakebook</h1>
            <p>Connect with friends and the world around you on Fakebook.</p>
          </div>
          <div className="right">
            <div className="login-box">
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Email or phone number"
                  className="input-field"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  required
                />
                <button type="submit" className="login-button">
                  Log In
                </button>
              </form>

              {}
              <a
                href="#"
                className="forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  setView('forgot');
                }}
              >
                Forgot password?
              </a>

              <hr />

              {}
              <button
                className="create-account"
                onClick={() => setView('register')}
              >
                Create new account
              </button>
            </div>
            <p className="create-page">
              <strong>Create a Page</strong> for a celebrity, brand, or business.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

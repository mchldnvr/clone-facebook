import React, { useState } from 'react';
import './Register.css';

function Register({ goToLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdayMonth: 'Mar',
    birthdayDay: '29',
    birthdayYear: '2025',
    gender: '',
    email: '',
    password: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Account created successfully!', formData);
    alert('Account created successfully!'); 
    goToLogin(); 
  };

  return (
    <div className="register-container">
      <h1 className="logo">Fakebook</h1>
      <div className="register-box">
        <h2>Create a new account</h2>
        <p className="subtitle">It's quick and easy.</p>
        <form onSubmit={handleSubmit}>
          {}
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {}
          <div className="birthday">
            <label>Birthday?</label>
            <div className="dob-select">
              <select
                name="birthdayMonth"
                value={formData.birthdayMonth}
                onChange={handleChange}
              >
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
              </select>
              <select
                name="birthdayDay"
                value={formData.birthdayDay}
                onChange={handleChange}
              >
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
              </select>
              <select
                name="birthdayYear"
                value={formData.birthdayYear}
                onChange={handleChange}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>

          {}
          <div className="gender">
            <label>Gender?</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  required
                />{' '}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                />{' '}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Custom"
                  onChange={handleChange}
                />{' '}
                Custom
              </label>
            </div>
          </div>

          {}
          <input
            type="text"
            name="email"
            placeholder="Mobile number or email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {}
          <button type="submit" className="sign-up-button">
            Sign Up
          </button>
        </form>

        {}
        <p className="login-link">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); 
              goToLogin(); 
            }}
          >
            Already have an account?
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;

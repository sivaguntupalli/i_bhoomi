// src/pages/Auth/AuthForm.js
import React from 'react';
import '../../assets/styles/components/_auth.scss';

const AuthForm = ({ title, onSubmit, children }) => (
  <div className="auth-container">
    <form className="auth-form" onSubmit={onSubmit}>
      <h2 className="form-title">{title}</h2>
      {children}
    </form>
  </div>
);

export default AuthForm;

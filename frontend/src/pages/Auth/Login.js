// src/pages/Auth/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // ✅ Using AuthContext
import AuthForm from './AuthForm';

const Login = () => {
  const navigate = useNavigate();
  const { login, user, error, loading } = useAuth(); // ✅ From context
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (!formData.password.trim()) errors.password = 'Password is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const success = await login(formData.username, formData.password);
    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  return (
    <AuthForm title="Login" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      {formErrors.username && <span className="error-message">{formErrors.username}</span>}
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      {formErrors.password && <span className="error-message">{formErrors.password}</span>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </AuthForm>
  );
};

export default Login;

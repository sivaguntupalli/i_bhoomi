import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { useAuth } from '../../contexts/AuthContext'; // ✅ use context instead
import userApi from '../../services/user/userApi';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Grab login from context

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // ✅ Step 1: Register
      await userApi.post('/register/', formData);

      // ✅ Step 2: Use context login to persist auth
      const loginSuccess = await login(formData.username, formData.password);

      if (loginSuccess) {
        navigate('/dashboard', { replace: true });
      } else {
        setError('Login failed after registration.');
      }

    } catch (err) {
      if (err?.response?.data?.username) {
        setError('⚠️ Username already exists.');
      } else if (err?.response?.data?.email) {
        setError('⚠️ Email already exists.');
      } else {
        setError('❌ Something went wrong. Please try again.');
      }
    }
  };

  return (
    <AuthForm title="Register" onSubmit={handleSubmit}>
      {error && (
        <p className="error-message" style={{ color: 'red', fontWeight: 'bold' }}>
          {error}
        </p>
      )}
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={formData.username}
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
      />
      <button type="submit">
        Register
      </button>
    </AuthForm>
  );
};

export default Register;

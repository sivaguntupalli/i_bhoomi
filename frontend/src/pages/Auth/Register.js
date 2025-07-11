import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/authSlice';
import AuthForm from './AuthForm';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') navigate('/login');
    });
  };

  return (
    <AuthForm title="Register" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Registering...' : 'Register'}
      </button>
    </AuthForm>
  );
};

export default Register;

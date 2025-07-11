// frontend/src/pages/Dashboard/Profile.js

import React, { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    phone: '',
    address: '',
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await userApi.get(`/api/users/${user.user_id}/`);
        const profileRes = await userApi.get(`/api/profiles/${user.user_id}/`);
        setFormData({
          username: userRes.data.username,
          email: userRes.data.email,
          role: userRes.data.role,
          phone: profileRes.data.phone || '',
          address: profileRes.data.address || '',
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setMessage('Failed to load profile.');
      }
    };

    if (user?.user_id) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await userApi.put(`/api/profiles/${user.user_id}/`, {
        phone: formData.phone,
        address: formData.address,
      });
      setMessage('Profile updated successfully.');
      setStatus('succeeded');
    } catch (err) {
      setMessage('Failed to update profile.');
      setStatus('failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div><strong>Username:</strong> {formData.username}</div>
        <div><strong>Email:</strong> {formData.email}</div>
        <div><strong>Role:</strong> {formData.role}</div>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;

// src/pages/Unauthorized.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/components/_auth.scss';

const Unauthorized = () => {
  const navigate = useNavigate();
  
  return (
    <div className="unauthorized-container">
      <h1>🚫 Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <button 
        className="return-btn"
        onClick={() => navigate('/')}
      >
        Return to Home
      </button>
    </div>
  );
};

export default Unauthorized;
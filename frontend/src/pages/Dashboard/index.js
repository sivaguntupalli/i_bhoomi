// src/pages/Dashboard/index.js

import React from 'react';
import Profile from './Profile';
import Properties from './Properties';

const Dashboard = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
    <div style={{ flex: 1 }}>
      <Profile />
    </div>
    <div style={{ flex: 2 }}>
      <Properties />
    </div>
  </div>
);

export default Dashboard;
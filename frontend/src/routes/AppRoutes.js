// 📄 File: src/routes/AppRoutes.js

import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/routing/ProtectedRoute';
import Loader from '../components/common/Loader'; // ✅ Suspense fallback loader

// ✅ Lazy-loaded pages for optimized performance
const Home = lazy(() => import('../pages/Home'));
const PropertyListing = lazy(() => import('../pages/Property/Listing'));
const Chat = lazy(() => import('../components/Chat'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Profile = lazy(() => import('../pages/Dashboard/Profile'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<PropertyListing />} />
          <Route path="chat" element={<Chat />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />

          {/* ✅ Protected dashboard route for authorized roles only */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute roles={['admin', 'individual', 'agent']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

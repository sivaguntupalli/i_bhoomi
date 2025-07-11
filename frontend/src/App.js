import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/styles/global.scss';
import Layout from "./components/layout/Layout";
import ProtectedRoute from './components/routing/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Chat from './components/Chat';

const Home = lazy(() => import("./pages/Home"));
const PropertyListing = lazy(() => import("./pages/Property/Listing"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Profile = lazy(() => import("./pages/Dashboard/Profile"));

function App() {
  console.log("App.js is rendering!");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="properties" element={<PropertyListing />} />
            <Route path="chat" element={<Chat />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={
              <ProtectedRoute roles={['admin', 'buyer', 'agent']}>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

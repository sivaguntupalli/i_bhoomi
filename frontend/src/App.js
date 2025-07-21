// src/App.js
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import './assets/styles/global.scss';
import Loader from './components/common/Loader';
import { useAuth } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes'; // Now centralized

function App() {
  const { loading } = useAuth();
  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

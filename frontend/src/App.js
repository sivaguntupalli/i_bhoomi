import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/styles/global.scss';
import Layout from "./components/layout/Layout";
import Chat from './components/Chat';

const Home = lazy(() => import("./pages/Home"));
const PropertyListing = lazy(() => import("./pages/Property/Listing"));

function App() {
  console.log("App.js is rendering!");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="properties" element={<PropertyListing />} />
            {/* Add Chat route if needed */}
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
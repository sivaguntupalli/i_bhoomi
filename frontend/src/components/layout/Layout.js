// src/components/layout/Layout.js

import { Outlet, Link } from "react-router-dom";
import Chat from '../Chat';
import './layout.scss'; // Make sure this line exists to apply your styles

const Layout = () => {
  return (
    <div className="layout">
      <header className="header">
        <h2>iBhoomi</h2>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <main>
        <Outlet /> {/* This renders route-specific content */}
      </main>

      <footer>
        Footer Content Here
      </footer>

      <Chat /> {/* Global chat widget (shown on all pages) */}
    </div>
  );
};

export default Layout;

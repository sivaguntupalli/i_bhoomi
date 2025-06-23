import { Outlet } from "react-router-dom";
import Chat from '../Chat'; 

const Layout = () => {
  return (
    <div className="layout">
      <header>Header Content Here</header>
      <main>
        <Outlet /> {/* This renders route-specific content */}
      </main>
      <footer>Footer Content Here</footer>
      <Chat /> {/* Global chat widget (shown on all pages) */}
    </div>
  );
};

export default Layout;
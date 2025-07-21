// src/components/common/Loader.js
import React from "react";
import "../../assets/styles/components/_loader.scss"; // Optional: if you have styles

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;

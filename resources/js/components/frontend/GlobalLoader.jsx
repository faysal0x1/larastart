// src/components/GlobalLoader.jsx
import React from 'react';
import '../../../css/loader.css';

const GlobalLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
    <div className="loader"></div>
  </div>
);

export default GlobalLoader;

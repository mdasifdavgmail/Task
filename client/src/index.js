// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

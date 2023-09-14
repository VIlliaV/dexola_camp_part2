import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/modern-normalize.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/dexola_camp">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

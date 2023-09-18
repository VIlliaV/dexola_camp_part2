import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/modern-normalize.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import { Context } from './Context/Context.jsx';
import { Wagmi } from './Wagmi/Wagmi.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Wagmi>
        <App />
      </Wagmi>
    </BrowserRouter>
  </React.StrictMode>
);

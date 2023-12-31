import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/modern-normalize.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Wagmi } from './Wagmi/Wagmi.jsx';
import { Context } from './Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Wagmi>
        <Context>
          <App />
        </Context>
      </Wagmi>
    </BrowserRouter>
  </React.StrictMode>
);

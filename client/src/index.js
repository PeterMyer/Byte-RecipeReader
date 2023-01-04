import React from 'react';
import ReactDOM from 'react-dom/client';
import {Auth0ProviderWithHistory} from './Features/Auth/';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";

const historyInstance = createBrowserHistory();   


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router history = {historyInstance}>
        <Auth0ProviderWithHistory>
          <App/>
        </Auth0ProviderWithHistory>
      </Router>
  </React.StrictMode>
);

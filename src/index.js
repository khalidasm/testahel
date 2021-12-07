import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import Home from './Home';
import FadeIn from 'react-fade-in'
import {CookiesProvider} from 'react-cookie'
import 'sweetalert2/src/sweetalert2.scss'
import './i18n';

ReactDOM.render(
  <CookiesProvider>
  <Router>
    <React.StrictMode>
      <FadeIn>
        <App />
      </FadeIn>
    </React.StrictMode>
  </Router>
  </CookiesProvider>
  ,
  document.getElementById('root')
);

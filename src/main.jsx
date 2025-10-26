import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'animate.css';
import { ThemeProvider } from "./Pages/ThemeContext";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider>
        <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from './contexts/Theme';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <ThemeProvider>
    <App />
    </ThemeProvider>
  
);
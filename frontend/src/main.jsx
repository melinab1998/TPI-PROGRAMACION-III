import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationContextProvider } from "./services/auth/AuthContextProvider";
import { ThemeContextProvider } from './services/theme/ThemeContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationContextProvider>
        <ThemeContextProvider>
        <App />  
        </ThemeContextProvider>
      </AuthenticationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
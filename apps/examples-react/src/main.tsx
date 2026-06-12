import React from 'react';
import { createRoot } from 'react-dom/client';
 import App from './App';
import "@componentry/theme/styles/light.css"
import "@componentry/theme/styles/dark.css"
 
createRoot(document.getElementById('root')!).render(<App />);

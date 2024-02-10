/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Telegram?: any;
  }
}

import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import './index.scss';

export const TelegramContext = createContext({});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TelegramContext.Provider value={window.Telegram.WebApp}>
      <App />
    </TelegramContext.Provider>
  </React.StrictMode>
);

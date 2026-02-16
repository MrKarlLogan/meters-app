import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { initializeStore, RootStoreContext } from './store/index.ts';

const store = initializeStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootStoreContext.Provider value={store}>
      <App />
    </RootStoreContext.Provider>
  </StrictMode>
);

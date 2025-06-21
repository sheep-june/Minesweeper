import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import store, {persistor} from './redux/store.js'
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<div>로딩 중...</div>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>
  </BrowserRouter>,
);

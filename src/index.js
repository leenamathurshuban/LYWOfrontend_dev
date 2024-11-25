import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.css';
import './fonts/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store,persistor } from "../src/Slice/Store";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();

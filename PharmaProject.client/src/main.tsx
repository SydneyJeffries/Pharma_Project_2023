import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Bootstrap.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './Store.tsx';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import './styles/App.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
  </React.StrictMode>,
)

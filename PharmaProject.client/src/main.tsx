import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import { Provider } from 'react-redux';
import { store } from './Store.tsx';
import './styles/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap-utilities.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
  </React.StrictMode>,
)

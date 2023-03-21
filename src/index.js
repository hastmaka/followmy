import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ThemeProvider from './theme';
import EzNotification from "./components/EzNotification/EzNotification";
import EzConfirmDialog from "./components/EzConfirmDialog/EzConfirmDialog";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App/>
            <EzNotification/>
            <EzConfirmDialog/>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
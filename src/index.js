import {StrictMode} from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import EzNotification from "./components/EzNotification/EzNotification";
import EzConfirmDialog from "./components/EzConfirmDialog/EzConfirmDialog";
import store from "./store";
import {Provider} from "react-redux";
import ThemeProvider from "./theme";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider>
                    <App/>
                    <EzNotification/>
                    <EzConfirmDialog/>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
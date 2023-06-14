import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthProvider from "./providers/AuthProvider";
import {ToastContainer} from "react-toastify";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>

            <ToastContainer/>
            <App/>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
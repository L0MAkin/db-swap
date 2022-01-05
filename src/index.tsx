import React from 'react';
import ReactDOM from 'react-dom';

import './i18n';
import './styles/index.css';

import App from './App/App';
import reportWebVitals from './reportWebVitals';

import { NearProvider, NearEnvironment } from 'react-near';
// NOTE: this package is required for make near-api-js work properly.
import { Buffer } from 'buffer';
global.Buffer = Buffer;


ReactDOM.render(
    <React.StrictMode>
        <NearProvider environment={NearEnvironment.TestNet}>
            <App />
        </NearProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

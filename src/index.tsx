import React from 'react';
import ReactDOM from 'react-dom';

import './i18n';
import './styles/index.css';

import { NearEnvironment, NearProvider } from 'react-near';
import { Buffer } from 'buffer';
import App from './components/App/App';

// NOTE: necessary fix for a client because `Buffer` object is used by 'near-api-js' lib.
global.Buffer = Buffer;

ReactDOM.render(
    <React.StrictMode>
        <NearProvider environment={NearEnvironment.TestNet}>
            <App />
        </NearProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';

import './i18n';
import './styles/index.css';

import { Buffer } from 'buffer';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { NearProviderWithSandbox } from './config/near-env';

// NOTE: necessary fix for a client because `Buffer` object is used by 'near-api-js' lib.
global.Buffer = Buffer;

ReactDOM.render(
    <React.StrictMode>
        <NearProviderWithSandbox>
            <RecoilRoot>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </RecoilRoot>
        </NearProviderWithSandbox>
    </React.StrictMode>,
    document.getElementById('root')
);

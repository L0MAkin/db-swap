import React from 'react';
import { useNearWallet } from 'react-near';

import Router from './Router';
import Loader from './Loader';
import { WorkerProvider } from '../contexts/Worker';

function App() {
    // wait wallet for initialization
    const wallet = useNearWallet();
    if (!wallet) {
        return <Loader />;
    }

    return (
        <WorkerProvider>
            <Router />
        </WorkerProvider>
    );
}

export default App;

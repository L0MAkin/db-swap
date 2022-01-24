import React, { useEffect } from 'react';
import { useNearWallet } from 'react-near';
import { useWhitelistedContext } from '../hooks/useWhitelistedContext';
import { useWalletAuthorized } from '../hooks/useWalletAuthorized';

import Router from './Router';
import Loader from './Loader';
import { WhitelistedProvider } from '../contexts/WhitelistedContext';

function App() {
    const { authorized } = useWalletAuthorized();
    const { callIsAccountWhitelisted } = useWhitelistedContext();

    useEffect(() => {
        if (authorized) {
            callIsAccountWhitelisted();
        }
    }, [authorized]);

    return <Router />;
}

function AppWrapper() {
    // wait wallet for initialization
    const wallet = useNearWallet();
    if (!wallet) {
        return <Loader />;
    }

    return (
        <WhitelistedProvider>
            <App />
        </WhitelistedProvider>
    );
}

export default AppWrapper;

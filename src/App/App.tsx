import React, { FC, useEffect } from 'react';
import { useNearWallet } from 'react-near';
import { useWhitelistedContext } from '../contexts/WhitelistedContext';
import { useWalletAuthorized } from '../hooks/useWalletAuthorized';

import Router from '../routes/Router';
import Loader from './Loader';

const AppLayout: FC = ({ children }) => <>{children}</>; // utility wrapper

function App() {
    const wallet = useNearWallet();

    console.log(wallet);

    const { authorized } = useWalletAuthorized();
    const { callIsAccountWhitelisted } = useWhitelistedContext();

    useEffect(() => {
        if (authorized) {
            callIsAccountWhitelisted();
        }
    }, [authorized, callIsAccountWhitelisted]);
    // check if wallet even initialized
    if (!wallet) {
        return <Loader />;
    }

    return (
        <AppLayout>
            <Router />
        </AppLayout>
    );
}

export default App;

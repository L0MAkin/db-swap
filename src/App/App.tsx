import React, { FC } from 'react';
import { useNearWallet } from 'react-near';

import Router from './Router';
import Loader from './Loader';
import { useWhitelisted } from '../hooks/useWhitelisted';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // wait wallet for initialization
    const wallet = useNearWallet();
    if (!wallet) {
        return <Loader />;
    }

    const WithWallet: FC = ({ children }) => {
        useWhitelisted(true);

        return <>{children}</>;
    };

    return (
        <WithWallet>
            <Router />
            <ToastContainer />
        </WithWallet>
    );
}

export default App;

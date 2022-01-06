import { FC } from 'react';
import { useNearWallet } from 'react-near';
import { Navigate } from 'react-router-dom';

const AuthorizedLayout: FC<{ children: any }> = ({ children }) => {
    const wallet = useNearWallet();

    if (!wallet) {
        return <div>loading wallet...</div>;
    }

    if (wallet && !wallet.isSignedIn()) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AuthorizedLayout;

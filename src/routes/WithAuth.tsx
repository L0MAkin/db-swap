import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useWhitelistedContext } from '../contexts/WhitelistedContext';
import { useWalletAuthorized } from '../hooks/useWalletAuthorized';

const WithAuth: FC = ({ children }) => {
    const { authorized } = useWalletAuthorized();
    const { whitelisted } = useWhitelistedContext();

    if (!authorized) {
        return <Navigate to="/" />;
    }

    if (!whitelisted) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default WithAuth;

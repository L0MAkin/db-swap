import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useWhitelistedContext } from '../contexts/WhitelistedContext';
import { useWalletAuthorized } from '../hooks/useWalletAuthorized';

const AuthLayout: FC = ({ children }) => {
    const { authorized } = useWalletAuthorized();
    const { whitelisted } = useWhitelistedContext();

    if (!authorized) {
        return <Navigate to="/" />;
    }

    // TODO: may be wait until whitelisted prop loaded?
    if (!whitelisted) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default AuthLayout;

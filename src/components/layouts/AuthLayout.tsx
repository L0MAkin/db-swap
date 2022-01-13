import { FC } from 'react';
import { useNearWallet } from 'react-near';
import { Navigate } from 'react-router-dom';
import { useWhitelistedContext } from '../../contracts/nearcrowd/WhitelistedContext';

const AuthLayout: FC = ({ children }) => {
    const authorized = useNearWallet()!.isSignedIn();
    const { whitelisted } = useWhitelistedContext();

    if (!authorized) {
        return <Navigate to="/" />;
    }

    if (!whitelisted) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default AuthLayout;

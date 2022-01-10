import { FC } from 'react';
import { useNearWallet } from 'react-near';
import { Navigate } from 'react-router-dom';

const AuthorizedLayout: FC = ({ children }) => {
    const wallet = useNearWallet();
    const authorized = wallet?.isSignedIn();

    return <>{authorized ? children : <Navigate to="/" />}</>;
};

export default AuthorizedLayout;

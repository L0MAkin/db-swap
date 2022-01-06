import { FC } from 'react';
import { useNearWallet } from 'react-near';
import { useNavigate } from 'react-router-dom';

const AuthorizedLayout: FC = ({ children }) => {
    const wallet = useNearWallet();
    const navigate = useNavigate();

    if (!wallet) {
        return <div>loading wallet...</div>;
    }

    if (wallet && !wallet.isSignedIn()) {
        navigate('/');
    }

    return <>{children}</>;
};

export default AuthorizedLayout;

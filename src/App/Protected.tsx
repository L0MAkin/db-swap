import { Navigate, Outlet } from 'react-router-dom';
import { useWalletAuthorized } from '../hooks/useWalletAuthorized';
import Loader from './Loader';
import { useWorkerContext } from '../contexts/Worker';

function Whitelisted() {
    const { account } = useWorkerContext();

    if (account.whitelisted === null) {
        return <Loader />;
    }

    return account.whitelisted ? <Outlet /> : <Navigate to="/" />;
}

function WalletAuthorized() {
    const { authorized } = useWalletAuthorized();

    return authorized ? <Outlet /> : <Navigate to="/" />;
}

export default {
    Whitelisted,
    WalletAuthorized
};

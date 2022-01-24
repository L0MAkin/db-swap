import { Navigate, Outlet } from 'react-router-dom';
import { useWhitelistedContext } from '../hooks/useWhitelistedContext';
import { useWalletAuthorized } from '../hooks/useWalletAuthorized';
import Loader from './Loader';

function Whitelisted() {
    const { whitelisted, whitelistChecked } = useWhitelistedContext();

    if (!whitelistChecked) {
        return <Loader />;
    }

    return whitelisted ? <Outlet /> : <Navigate to="/" />;
}

function WalletAuthorized() {
    const { authorized } = useWalletAuthorized();

    return authorized ? <Outlet /> : <Navigate to="/" />;
}

export default {
    Whitelisted,
    WalletAuthorized
};

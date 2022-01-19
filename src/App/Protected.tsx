import { Navigate, Outlet } from 'react-router-dom';
import { useWhitelistedContext } from '../hooks/useWhitelistedContext';
import { useWalletAuthorized } from '../hooks/useWalletAuthorized';
import Loader from './Loader';

export function WhitelistProtectedRoutes() {
    const { whitelisted, whitelistChecked } = useWhitelistedContext();

    if (!whitelistChecked) {
        return <Loader />;
    }

    return whitelisted ? <Outlet /> : <Navigate to="/" />;
}

export function WalletAuthorizedProtectedRoutes() {
    const { authorized } = useWalletAuthorized();

    return authorized ? <Outlet /> : <Navigate to="/" />;
}

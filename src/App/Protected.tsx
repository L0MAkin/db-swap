import { Navigate, Outlet } from 'react-router-dom';
import { useAuthorized } from '../hooks/useAuthorized';
import Loader from './Loader';
import { useWhitelisted } from '../hooks/useWhitelisted';

function Whitelisted() {
    const { whitelisted } = useWhitelisted();

    if (whitelisted === null) {
        return <Loader />;
    }

    return whitelisted ? <Outlet /> : <Navigate to="/" />;
}

function Authorized() {
    const { authorized } = useAuthorized();

    return authorized ? <Outlet /> : <Navigate to="/" />;
}

export default {
    Whitelisted,
    Authorized
};

import { ClientAPI } from '../services/api';
import { useNearWallet } from 'react-near';
import { useEffect, useMemo } from 'react';

export function useApi() {
    const wallet = useNearWallet();
    const api = useMemo(() => new ClientAPI(), []);

    useEffect(() => {
        if (wallet) {
            api.wallet = wallet;
        }
    }, [wallet]);

    return api;
}

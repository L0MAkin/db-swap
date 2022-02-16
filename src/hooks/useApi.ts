import { ClientAPI } from '../services/api';
import { useNearAccount } from 'react-near';
import { useEffect, useMemo } from 'react';

export function useApi() {
    const account = useNearAccount();
    const api = useMemo(() => new ClientAPI(), []);

    useEffect(() => {
        if (account) {
            api.setAccount(account);
        }
    }, [account]);

    return api;
}

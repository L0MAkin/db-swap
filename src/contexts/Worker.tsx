import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { AccountStats, AccountState, useNearcrowdContract } from '../contracts/nearcrowd-v1';

interface Worker {
    authorized: boolean;
    account: {
        whitelisted: boolean | null;
        stats: AccountStats | null;
        state: AccountState | null;
    };

    // currentTaskset: {
    //     ordinal: number;
    // };
    //
    // currentAssignment: {
    //     hash: number[];
    // };

    viewIsAccountWhitelisted(): Promise<void>;
}

const WorkerContext = createContext<Worker>({
    authorized: false,
    account: {
        whitelisted: null,
        stats: null,
        state: null
    },
    // currentTaskset: {
    //     ordinal: -1
    // },
    // currentAssignment: {
    //     hash: []
    // }

    viewIsAccountWhitelisted: () => Promise.resolve()
});

export const useWorkerContext = () => useContext(WorkerContext);

export function WorkerProvider({ children }: { children: ReactNode }) {
    const { wallet, isAccountWhitelisted, getAccountState } = useNearcrowdContract();
    const authorized = wallet.isSignedIn();

    const [whitelisted, setWhitelisted] = useState<boolean | null>(null);
    const [accountState, setAccountState] = useState<AccountState | null>(null);
    const [accountStats, setAccountStats] = useState<AccountStats | null>(null);
    const [currentTaskset, setCurrentTaskset] = useState<{ ordinal: number } | null>(null);

    const viewIsAccountWhitelisted = useCallback(async () => {
        const accountWhitelisted = await isAccountWhitelisted();
        setWhitelisted(accountWhitelisted);
    }, []);

    const viewGetAccountState = useCallback(async () => {
        const result = await getAccountState(currentTaskset?.ordinal);
        setAccountState(result);
    }, [currentTaskset]);

    // immediately check if account whitelisted
    useEffect(() => {
        if (authorized) {
            viewIsAccountWhitelisted().catch(console.error);
        }
    }, [authorized]);

    return (
        <WorkerContext.Provider
            value={{
                authorized,

                account: {
                    whitelisted,
                    stats: accountStats,
                    state: accountState
                },

                viewIsAccountWhitelisted

                // checkAccountWhitelisted
            }}
        >
            {children}
        </WorkerContext.Provider>
    );
}

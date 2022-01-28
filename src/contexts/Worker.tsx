import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { AccountStatsOnChain, AccountStateOnChain, useNearcrowdContract } from '../contracts/nearcrowd-v1';

interface Worker {
    authorized: boolean;
    account: {
        whitelisted: boolean | null;
        stats: AccountStatsOnChain | null;
        state: AccountStateOnChain | null;
    };

    // currentTaskset: {
    //     ordinal: number;
    // };
    //
    // currentAssignment: {
    //     hash: number[];
    // };

    viewIsAccountWhitelisted(): Promise<void>;
    viewGetAccountState(tasksetOrdinal?: number): Promise<void>;
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

    viewIsAccountWhitelisted: () => Promise.resolve(),
    viewGetAccountState: (tasksetOrdinal?: number) => Promise.resolve()
});

export const useWorkerContext = () => useContext(WorkerContext);

export function WorkerProvider({ children }: { children: ReactNode }) {
    const { wallet, isAccountWhitelisted, getAccountState } = useNearcrowdContract();
    const authorized = wallet.isSignedIn();

    const [whitelisted, setWhitelisted] = useState<boolean | null>(null);
    const [accountState, setAccountState] = useState<AccountStateOnChain | null>(null);
    const [accountStats, setAccountStats] = useState<AccountStatsOnChain | null>(null);
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

                viewIsAccountWhitelisted,
                viewGetAccountState

                // checkAccountWhitelisted
            }}
        >
            {children}
        </WorkerContext.Provider>
    );
}

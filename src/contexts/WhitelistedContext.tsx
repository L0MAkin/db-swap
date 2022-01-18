import { createContext, ReactNode, useContext, useState } from 'react';
import { useNearWallet } from 'react-near';
import { useNearcrowdContract } from '../contracts/nearcrowd';

// TODO: this can be replaced by redux state later

interface WhitelistedContextType {
    whitelisted: boolean;
    callIsAccountWhitelisted: () => Promise<void>;
}

const WhitelistedContext = createContext<WhitelistedContextType>({
    whitelisted: false,
    callIsAccountWhitelisted: async () => {}
});

export function WhitelistedProvider({ children }: { children: ReactNode }) {
    const wallet = useNearWallet()!;
    const contract = useNearcrowdContract();
    const [whitelisted, setWhitelisted] = useState<boolean>(false);

    async function callIsAccountWhitelisted() {
        const result = await contract.is_account_whitelisted({
            account_id: wallet.account().accountId
        });

        setWhitelisted(result);
    }

    const value = { whitelisted, callIsAccountWhitelisted };

    return (
        <WhitelistedContext.Provider value={value}>
            {children}
        </WhitelistedContext.Provider>
    );
}

export function useWhitelistedContext() {
    return useContext(WhitelistedContext);
}

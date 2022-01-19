import { createContext, ReactNode, useState } from 'react';
import { useNearWallet } from 'react-near';
import { useNearcrowdContract } from '../contracts/nearcrowd-v1';

interface WhitelistedContextType {
    whitelisted: boolean;
    whitelistChecked: boolean;
    callIsAccountWhitelisted: () => Promise<void>;
}

export const WhitelistedContext = createContext<WhitelistedContextType>({
    whitelisted: false,
    whitelistChecked: false,
    callIsAccountWhitelisted: async () => {}
});

export function WhitelistedProvider({ children }: { children: ReactNode }) {
    const wallet = useNearWallet()!;
    const contract = useNearcrowdContract();
    const [whitelisted, setWhitelisted] = useState<boolean>(false);
    const [whitelistChecked, setWhitelistChecked] = useState<boolean>(false);

    async function callIsAccountWhitelisted() {
        const result = await contract.is_account_whitelisted({
            account_id: wallet.account().accountId
        });

        setWhitelisted(result);
        setWhitelistChecked(true);
    }

    const value = { whitelisted, whitelistChecked, callIsAccountWhitelisted };

    return (
        <WhitelistedContext.Provider value={value}>
            {children}
        </WhitelistedContext.Provider>
    );
}

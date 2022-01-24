import { createContext, ReactNode, useCallback, useState } from 'react';
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
    const { wallet, isAccountWhitelisted } = useNearcrowdContract();
    const [whitelisted, setWhitelisted] = useState<boolean>(false);
    const [whitelistChecked, setWhitelistChecked] = useState<boolean>(false);

    const callIsAccountWhitelisted = useCallback(async () => {
        if (!wallet) {
            return;
        }

        const result = await isAccountWhitelisted();

        setWhitelisted(result);
        setWhitelistChecked(true);
    }, [wallet]);

    const value = { whitelisted, whitelistChecked, callIsAccountWhitelisted };

    return (
        <WhitelistedContext.Provider value={value}>
            {children}
        </WhitelistedContext.Provider>
    );
}

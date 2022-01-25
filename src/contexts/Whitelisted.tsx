import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { useNearcrowdContract } from '../contracts/nearcrowd-v1';

interface WhitelistedContextType {
    whitelisted: boolean | null;
    callIsAccountWhitelisted: () => Promise<void>;
}

export const WhitelistedContext = createContext<WhitelistedContextType>({
    whitelisted: false,
    callIsAccountWhitelisted: async () => {}
});

export function useWhitelistedContext() {
    return useContext(WhitelistedContext);
}

export function WhitelistedProvider({ children }: { children: ReactNode }) {
    const { wallet, isAccountWhitelisted } = useNearcrowdContract();
    const [whitelisted, setWhitelisted] = useState<boolean | null>(null);

    const callIsAccountWhitelisted = useCallback(async () => {
        if (!wallet) {
            return;
        }

        const result = await isAccountWhitelisted();

        setWhitelisted(result);
    }, [wallet]);

    const value = { whitelisted, callIsAccountWhitelisted };

    return <WhitelistedContext.Provider value={value}>{children}</WhitelistedContext.Provider>;
}

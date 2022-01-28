import { atom, useRecoilState } from 'recoil';
import { useNearcrowdContract } from '../contracts/nearcrowd/useNearcrowdContract';
import { useCallback, useEffect } from 'react';

export const whitelistedAtom = atom<boolean | null>({
    key: 'OnChain/whitelistedAtom',
    default: null
});

/**
 * Hook for fetching whitelisted prop of an account.
 */
export function useWhitelisted(fetchOnUsage = false) {
    const { methods } = useNearcrowdContract();
    const [whitelisted, setWhitelisted] = useRecoilState(whitelistedAtom);

    const fetchIsAccountWhitelisted = useCallback(async () => {
        const result = await methods.isAccountWhitelisted();
        setWhitelisted(result);
    }, []);

    // fetch once on usage
    useEffect(() => {
        if (!fetchOnUsage) {
            return;
        }

        if (whitelisted === null) {
            fetchIsAccountWhitelisted().catch(console.error);
        }
    }, [whitelisted]);

    return {
        whitelisted,
        fetchIsAccountWhitelisted
    };
}

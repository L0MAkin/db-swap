import { useNearcrowdContract } from '../contracts/nearcrowd/useNearcrowdContract';
import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { OnChain } from '../contracts/nearcrowd/contract';

const accountStatsAtom = atom<OnChain.AccountStats | null>({
    key: 'accountStatsAtom',
    default: null
});

/*
 * Hook logic for account stats.
 */
export function useAccountStats(fetchOnUsage = false) {
    const { methods } = useNearcrowdContract();

    const [accountStats, setAccountStats] = useRecoilState(accountStatsAtom);

    const fetchAccountStats = useCallback(async () => {
        const stats = await methods.getAccountStats();

        setAccountStats(stats);
    }, [methods]);

    // fetch once on usage
    useEffect(() => {
        if (!fetchOnUsage) {
            return;
        }

        fetchAccountStats().catch(console.error);
    }, []);

    return {
        accountStats,

        fetchAccountStats
    };
}

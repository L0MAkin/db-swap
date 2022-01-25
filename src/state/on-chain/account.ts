import { atom } from 'recoil';
import { AccountStateOnChain, AccountStatsOnChain } from '../../contracts/nearcrowd-v1';

export const whitelistedOnChain = atom<boolean | null>({
    key: 'whitelistedOnChain',
    default: null
});

export const accountStateOnChain = atom<AccountStateOnChain>({
    key: 'accountStateOnChain',
    default: 'NonExistent'
});

export const accountStatsOnChain = atom<AccountStatsOnChain>({
    key: 'accountStatsOnChain',
    default: {
        balance: '0',
        successful: 0,
        failed: 0
    }
});

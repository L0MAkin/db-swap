import { atom } from 'recoil';
import { TasksetStateOnChain } from '../../contracts/nearcrowd-v1';

export const currentTasksetOnChain = atom<number | null>({
    key: 'currentTasksetOnChain',
    default: null
});

export const currentTasksetStateOnChain = atom<TasksetStateOnChain | null>({
    key: 'currentTasksetStateOnChain',
    default: null
});

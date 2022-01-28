import { atom } from 'recoil';
import { TasksetStateOnChain } from '../../contracts/nearcrowd-v1';

export const currentTasksetOrdinalAtom = atom<number | null>({
    key: 'OnChain/currentTasksetOrdinalAtom',
    default: null
});

export const currentTasksetStateAtom = atom<TasksetStateOnChain | null>({
    key: 'OnChain/currentTasksetStateAtom',
    default: null
});

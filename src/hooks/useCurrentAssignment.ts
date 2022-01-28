import { atom } from 'recoil';
import { OnChain } from '../contracts/nearcrowd/contract';

export const currentAssignmentAtom = atom<OnChain.Assignment | null>({
    key: 'currentAssignmentAtom',
    default: null
});

export function useCurrentAssignment() {
    // ...
}

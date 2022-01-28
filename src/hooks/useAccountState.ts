import {
    isAccountStateHasAssignment,
    isAccountStateIdle,
    isAccountStateNonExistent,
    isAccountStateWaitsForAssignment,
    useNearcrowdContract
} from '../contracts/nearcrowd/useNearcrowdContract';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, useEffect } from 'react';
import { OnChain } from '../contracts/nearcrowd/contract';

const accountStateAtom = atom<OnChain.AccountState | null>({
    key: 'accountStateAtom',
    default: null
});

export const assignmentHashSelector = selector<string | null>({
    key: 'assignmentHashSelector',
    get: ({ get }) => {
        const s = get(accountStateAtom);

        if (s && isAccountStateHasAssignment(s)) {
            return s.HasAssignment.assignment.task_hash.join('');
        }

        return null;
    }
});

const isAccountStateSelector = selector({
    key: 'isAccountStateSelector',
    get: ({ get }) => {
        const state = get(accountStateAtom);

        if (state === null) return null;

        const nonExistent = isAccountStateNonExistent(state);
        const idle = isAccountStateIdle(state);
        const waitsForAssignment = isAccountStateWaitsForAssignment(state);
        const hasAssignment = isAccountStateHasAssignment(state);

        return {
            nonExistent,
            idle,
            waitsForAssignment,
            hasAssignment
        };
    }
});

/**
 * Hook logic for current assignment and account state.
 *
 * NOTE: Account state is bound to the currently selected tasksets.
 */
export function useAccountState(fetchOnUsage = false) {
    const { methods } = useNearcrowdContract();

    const [accountState, setAccountState] = useRecoilState(accountStateAtom);

    const assignmentHash = useRecoilValue(assignmentHashSelector);
    const isAccountState = useRecoilValue(isAccountStateSelector);

    const fetchAccountState = useCallback(async () => {
        const currentTasksetOrdinal = await methods.getCurrentTaskset();
        const result = await methods.getAccountState(currentTasksetOrdinal);

        setAccountState(result);
    }, [methods]);

    // fetch once on usage
    useEffect(() => {
        if (!fetchOnUsage) {
            return;
        }

        fetchAccountState().catch(console.error);
    }, []);

    return {
        isAccountState,
        assignmentHash,

        fetchAccountState
    };
}

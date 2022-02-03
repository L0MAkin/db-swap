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

const nextBidSelector = selector({
    key: 'nextBidSelector',
    get: ({ get }) => {
        const state = get(accountStateAtom);

        if (state === null) return null;

        if (isAccountStateWaitsForAssignment(state)) {
            return state.WaitsForAssignment.bid;
        }

        return null;
    }
});

const secondsPassedSinceAssignmentSelector = selector({
    key: 'secondsPassedSinceAssignmentSelector',
    get: ({ get }) => {
        const state = get(accountStateAtom);

        if (state === null) return null;

        if (!isAccountStateHasAssignment(state)) {
            return null;
        }

        return Number(state.HasAssignment.time_passed) / 10 ** 9;
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
    const nextBid = useRecoilValue(nextBidSelector);
    const isAccountState = useRecoilValue(isAccountStateSelector);
    const secondsPassedSinceAssignment = useRecoilValue(secondsPassedSinceAssignmentSelector);

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

    useEffect(() => {
        console.log({ accountState });
    }, [accountState]);

    return {
        isAccountState,
        assignmentHash,
        nextBid,
        secondsPassedSinceAssignment,

        fetchAccountState
    };
}

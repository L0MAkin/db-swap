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
import { nanosec2sec } from '../utils/nanosec';

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

        if (state && isAccountStateWaitsForAssignment(state)) {
            return state.WaitsForAssignment.bid;
        }

        return null;
    }
});

const timeLeftToWaitSelector = selector({
    key: 'timeLeftToWaitSelector',
    get: ({ get }) => {
        const state = get(accountStateAtom);

        if (state && isAccountStateWaitsForAssignment(state)) {
            return nanosec2sec(state.WaitsForAssignment.time_left);
        }

        return null;
    }
});

const timePassedSinceAssignmentSelector = selector({
    key: 'secondsPassedSinceAssignmentSelector',
    get: ({ get }) => {
        const state = get(accountStateAtom);

        if (state && isAccountStateHasAssignment(state)) {
            return nanosec2sec(state.HasAssignment.time_passed);
        }

        return null;
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

    const timePassedSinceAssignment = useRecoilValue(timePassedSinceAssignmentSelector);
    const timeLeftToWait = useRecoilValue(timeLeftToWaitSelector);
    const nextBid = useRecoilValue(nextBidSelector);

    const fetchAccountState = useCallback(async () => {
        const currentTasksetOrdinal = await methods.getCurrentTaskset();

        const result = await methods.getAccountState(currentTasksetOrdinal ?? 0);

        setAccountState(result);
    }, [methods]);

    // fetch once on usage
    useEffect(() => {
        if (!fetchOnUsage) {
            return;
        }

        fetchAccountState().catch(console.error);
    }, []);

    // useEffect(() => {
    //     console.log({ accountState });
    // }, [accountState]);

    return {
        isAccountState,
        assignmentHash,

        timePassedSinceAssignment,
        timeLeftToWait,
        nextBid,

        fetchAccountState
    };
}

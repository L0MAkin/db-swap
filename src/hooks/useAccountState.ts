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

export const accountStateAtom = atom<OnChain.AccountState | null>({
    key: 'accountStateAtom',
    default: null
});

enum AccountStateEnum {
    TasksetNotSelected = 'TasksetNotSelected',
    TasksetSelected = 'TasksetSelected',
    WaitingForTaskAssignment = 'WaitingForTaskAssignment',
    TaskAssigned = 'TaskAssigned'
}

export const accountStateEnumSelector = selector<AccountStateEnum | null>({
    key: 'accountStateEnumSelector',
    get: ({ get }) => {
        const state = get(accountStateAtom);

        if (state === null) return null;

        if (isAccountStateNonExistent(state)) {
            return AccountStateEnum.TasksetNotSelected;
        }

        if (isAccountStateIdle(state)) {
            return AccountStateEnum.TasksetSelected;
        }

        if (isAccountStateWaitsForAssignment(state)) {
            return AccountStateEnum.WaitingForTaskAssignment;
        }

        if (isAccountStateHasAssignment(state)) {
            return AccountStateEnum.TaskAssigned;
        }

        return null;
    }
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

/**
 * Hook logic for current assignment and account state.
 *
 * NOTE: Account state is bound to the currently selected tasksets.
 */
export function useAccountState(fetchOnUsage = false) {
    const { methods } = useNearcrowdContract();

    const [accountState, setAccountState] = useRecoilState(accountStateAtom);

    const assignmentHash = useRecoilValue(assignmentHashSelector);
    const accountStateEnum = useRecoilValue(accountStateEnumSelector);

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
        accountStateEnum,
        assignmentHash,

        fetchAccountState
    };
}

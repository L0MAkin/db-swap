import { atom, selector } from 'recoil';
import {
    AccountStateOnChain,
    isAccountStateNonExistent,
    isAccountStateHasAssignment,
    isAccountStateIdle,
    isAccountStateWaitsForAssignment
} from '../../contracts/nearcrowd-v1';

export const whitelistedAtom = atom<boolean | null>({
    key: 'OnChain/whitelistedAtom',
    default: null
});

export const accountStateAtom = atom<AccountStateOnChain | null>({
    key: 'OnChain/accountStateAtom',
    default: null
});

enum AccountStateEnum {
    TasksetNotSelected = 'TasksetNotSelected',
    TasksetSelected = 'TasksetSelected',
    WaitingForTaskAssignment = 'WaitingForTaskAssignment',
    TaskAssigned = 'TaskAssigned'
}

export const accountStateEnumSelector = selector<AccountStateEnum | null>({
    key: 'OnChain/accountStateEnumSelector',
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

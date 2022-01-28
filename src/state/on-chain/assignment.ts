import { atom, selector } from 'recoil';
import { AssignmentOnChain, isAccountStateHasAssignment } from '../../contracts/nearcrowd-v1';
import { accountStateAtom } from './account';

export const currentAssignmentStateAtom = atom<AssignmentOnChain | null>({
    key: 'OnChain/currentAssignmentStateAtom',
    default: null
});

export const assignmentTaskHashSelector = selector({
    key: 'OnChain/assignmentTaskHashSelector',
    get: ({ get }) => {
        const s = get(accountStateAtom);

        if (s && isAccountStateHasAssignment(s)) {
            return s.HasAssignment.assignment.task_hash.join('');
        }

        return null;
    }
});

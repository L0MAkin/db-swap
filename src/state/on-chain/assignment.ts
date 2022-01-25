import { atom } from 'recoil';
import { AssignmentOnChain } from '../../contracts/nearcrowd-v1';

export const currentAssignmentState = atom<AssignmentOnChain | null>({
    key: 'currentAssignmentState',
    default: null
});

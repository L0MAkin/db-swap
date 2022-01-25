import { atom } from 'recoil';

interface AssignmentDTO {
    id: string;
    hash: string;
    contents: string;
}

export const currentAssigmentState = atom<AssignmentDTO | null>({
    key: 'currentAssigmentState',
    default: null
});

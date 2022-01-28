import { atom } from 'recoil';
import { TaskDTO } from '../services/tasks';

export const currentTaskAtom = atom<TaskDTO | null>({
    key: 'currentTaskAtom',
    default: null
});

import { atom } from 'recoil';
import { TasksetDTO } from '../services/tasksets';

export const tasksetListState = atom<TasksetDTO[]>({
    key: 'tasksetListState',
    default: []
});

export const currentTasksetState = atom<TasksetDTO | null>({
    key: 'currentTasksetState',
    default: null
});

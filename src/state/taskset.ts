import { atom } from 'recoil';
import { TopicDTO } from '../services/topics';

export const tasksetListState = atom<TopicDTO[]>({
    key: 'tasksetListState',
    default: []
});

export const currentTasksetState = atom<TopicDTO | null>({
    key: 'currentTasksetState',
    default: null
});

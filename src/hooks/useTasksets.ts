import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { TopicDTO } from '../services/api/topics';

export const tasksetListAtom = atom<TopicDTO[] | null>({
    key: 'tasksetListAtom',
    default: null
});

export function useTasksets(fetchOnUsage = false) {
    const [tasksetList, setTasksetList] = useRecoilState(tasksetListAtom);

    const fetchTasksetList = useCallback(async () => {
        const list = await api.topics.fetchTopicsList();

        setTasksetList(list);
    }, []);

    // fetch once on first render
    useEffect(() => {
        if (!fetchOnUsage) return;

        if (tasksetList === null) {
            fetchTasksetList().catch(console.error);
        }
    }, [tasksetList]);

    return {
        tasksetList,

        fetchTasksetList
    };
}

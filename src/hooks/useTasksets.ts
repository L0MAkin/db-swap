import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { SDK } from '../services/api/sdk';

export const tasksetListAtom = atom<SDK.Topic[] | null>({
    key: 'tasksetListAtom',
    default: null
});

export function useTasksets(fetchOnUsage = false) {
    const [tasksetList, setTasksetList] = useRecoilState(tasksetListAtom);

    const fetchTasksetList = useCallback(async () => {
        const list = await api.getAllTopics();

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

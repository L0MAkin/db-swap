import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { SDK } from '../services/api/sdk';
import { useApi } from './useApi';

export const tasksetListAtom = atom<SDK.Topic[] | null>({
    key: 'tasksetListAtom',
    default: null
});

export function useTasksets(fetchOnUsage = false) {
    const api = useApi();
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

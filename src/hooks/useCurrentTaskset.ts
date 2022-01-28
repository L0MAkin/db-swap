import { useNearcrowdContract } from '../contracts/nearcrowd-v1';
import { useRecoilState } from 'recoil';
import { currentTasksetState } from '../state/taskset';
import { useCallback } from 'react';
import { fetchTopic } from '../services/topics';
import { currentTaskAtom } from '../state/task';

export function useCurrentTaskset() {
    const { methods } = useNearcrowdContract();
    const [currentTaskset, setCurrentTaskset] = useRecoilState(currentTasksetState);
    const [currentTask, setCurrentTask] = useRecoilState(currentTaskAtom);

    const getCurrentTasksetId = useCallback(async () => {
        return methods.getCurrentTaskset();
    }, [methods]);

    const fetchCurrentTaskset = useCallback(async () => {
        const ordinal = await methods.getCurrentTaskset();
        const data = await fetchTopic(ordinal);

        if (data) {
            setCurrentTaskset(data);
        }

        return data;
    }, [methods]);

    // const fetchCurrentTask = useCallback(async () => {
    //     const ordinal = await methods.getCurrentTaskset();
    //     const assignment = await methods.getCurrentAssignment(ordinal);
    //
    //     if (assignment) {
    //         setCurrentTask(data);
    //     }
    // }, [methods]);

    return {
        currentTaskset,

        getCurrentTasksetId,
        fetchCurrentTaskset
    };
}

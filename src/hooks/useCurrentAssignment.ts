import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { useNearcrowdContract } from '../contracts/nearcrowd/useNearcrowdContract';
import { TaskDTO } from '../services/api/tasks';

export const currentAssignmentAtom = atom<TaskDTO | null>({
    key: 'currentAssignmentAtom',
    default: null
});

export function useCurrentAssignment(fetchOnUsage = false) {
    const { methods } = useNearcrowdContract();
    const [currentAssignment, setCurrentAssignment] = useRecoilState(currentAssignmentAtom);

    const fetchCurrentAssignment = useCallback(async () => {
        const ordinal = await methods.getCurrentTaskset();
        const assignment = await methods.getCurrentAssignment(ordinal);

        const hash = assignment && assignment.task_hash.join('');

        if (hash) {
            const task = await api.tasks.fetchTask(hash);

            setCurrentAssignment(task);
        }
    }, []);

    // fetch once on usage
    useEffect(() => {
        if (!fetchOnUsage) {
            return;
        }

        fetchCurrentAssignment().catch(console.error);
    }, []);

    return {
        currentAssignment,

        fetchCurrentAssignment
    };
}

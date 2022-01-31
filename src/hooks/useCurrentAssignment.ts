import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { useNearcrowdContract } from '../contracts/nearcrowd/useNearcrowdContract';
import { TaskDTO } from '../services/api/tasks';

type Assignment = TaskDTO & { forReview: boolean };

export const currentAssignmentAtom = atom<Assignment | null>({
    key: 'currentAssignmentAtom',
    default: null
});

export function useCurrentAssignment(fetchOnUsage = false) {
    const { methods } = useNearcrowdContract();
    const [currentAssignment, setCurrentAssignment] = useRecoilState(currentAssignmentAtom);

    const fetchCurrentAssignment = useCallback(async () => {
        const ordinal = await methods.getCurrentTaskset();
        const assignment = await methods.getCurrentAssignment(ordinal);

        if (!assignment) {
            return;
        }

        const hash = assignment.task_hash.join('');
        const forReview = assignment.ordinal > 0;

        const task = await api.tasks.fetchTask(hash);

        // TODO: if for review then fetch solution also
        // if (forReview) {
        // const solution = await api.solutions.fetchLastSolution(hash);
        // }

        setCurrentAssignment({
            ...task,
            forReview
        });
    }, [methods]);

    const applyForAssignment = useCallback(
        async (ordinal: number) => {
            await methods.applyForAssignment(ordinal);
        },
        [methods]
    );

    const claimAssignment = useCallback(
        async (ordinal: number, bid: string) => {
            await methods.claimAssignment(ordinal, bid);
        },
        [methods]
    );

    // fetch once on usage
    useEffect(() => {
        if (!fetchOnUsage) {
            return;
        }

        fetchCurrentAssignment().catch(console.error);
    }, []);

    return {
        currentAssignment,

        fetchCurrentAssignment,

        claimAssignment,
        applyForAssignment
    };
}

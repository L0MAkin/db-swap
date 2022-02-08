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

function toHexString(byteArray: number[]) {
    return Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('');
}

export function useCurrentAssignment(fetchOnUsage = false) {
    const { methods } = useNearcrowdContract();
    const [currentAssignment, setCurrentAssignment] = useRecoilState(currentAssignmentAtom);

    const fetchCurrentAssignment = useCallback(async () => {
        const ordinal = await methods.getCurrentTaskset();

        if (ordinal === null) {
            return;
        }

        const assignment = await methods.getCurrentAssignment(ordinal);

        if (!assignment) {
            return;
        }

        const hash = toHexString(assignment.task_hash);
        const forReview = assignment.ordinal > 0;

        const task = await api.tasks.fetchTask(hash);

        // TODO: if for review then fetch solutions also
        // if (forReview) {
        // const solutions = await api.solutions.fetchLastSolution(hash);
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

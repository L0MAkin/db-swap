import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { useNearcrowdContract } from '../contracts/nearcrowd/useNearcrowdContract';
import { SDK } from '../services/api/sdk';
import { bytesToHex } from '../utils/bytes-and-hashes';
import { useApi } from './useApi';

type Assignment = SDK.Task & { forReview: boolean };

export const currentAssignmentAtom = atom<Assignment | null>({
    key: 'currentAssignmentAtom',
    default: null
});

export function useCurrentAssignment(fetchOnUsage = false) {
    const api = useApi();
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

        const forReview = assignment.ordinal > 0;

        const hash = bytesToHex(assignment.task_hash);
        const task = await api.getTaskByHash(hash);

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

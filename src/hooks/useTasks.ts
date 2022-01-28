import { useRecoilState, useRecoilValue } from 'recoil';
import { useNearcrowdContract } from '../contracts/nearcrowd-v1';
import { accountStateEnumSelector } from '../state/on-chain/account';
import { currentTaskAtom } from '../state/task';
import { useCallback } from 'react';
import { fetchTask } from '../services/tasks';

export function useTasks() {
    const { methods } = useNearcrowdContract();

    const [currentTask, setCurrentTask] = useRecoilState(currentTaskAtom);

    // async function requestTaskAssignment() {
    //     if (accountStateEnum === 'TasksetSelected') {
    //         const ordinal = await methods.getCurrentTaskset();
    //         await methods.applyForAssignment(ordinal);
    //         const accountState = await methods.getAccountState();
    //         await methods.claimAssignment(ordinal, );
    //     }
    // }
}

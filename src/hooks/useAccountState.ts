import { useNearcrowdContract } from '../contracts/nearcrowd-v1';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ocs } from '../state/on-chain';
import { useCallback } from 'react';

/**
 * Hook logic for current assignment and account state.
 *
 * NOTE: Account state is bound to the currently selected taskset.
 */
export function useAccountState() {
    const { methods } = useNearcrowdContract();

    // on-chain state
    const [accountState, setAccountState] = useRecoilState(ocs.accountStateAtom);

    // selectors
    const taskHash = useRecoilValue(ocs.assignmentTaskHashSelector);
    const accountStateEnum = useRecoilValue(ocs.accountStateEnumSelector);

    const fetchAccountState = useCallback(
        async (currentTasksetId: number) => {
            const data = await methods.getAccountState(currentTasksetId);

            setAccountState(data);
        },
        [methods]
    );

    return {
        accountStateEnum,
        taskHash,

        fetchAccountState
    };
}

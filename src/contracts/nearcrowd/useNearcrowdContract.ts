import { useNearContract, useNearWallet } from 'react-near';
import { useCallback } from 'react';
import { NEARCrowdContract, OnChain } from './contract';

export const CONTRACT_ID = 'nearcrowd.testnet';

export const VIEW_METHODS = [
    'is_account_whitelisted',
    'get_account_stats',
    'get_account_state',
    'get_taskset_state',
    'get_task_review_state',
    'get_current_assignment',
    'get_current_taskset'

    /* OTHER (defined in the original nearcrowd prototype) */
    // 'get_estimated_atto_tasks_per_share',
    // 'cheapest_invite',
    // 'can_push_queue'
];
export const CHANGE_METHODS = [
    'change_taskset',
    'apply_for_assignment',
    'claim_assignment',
    'return_assignment',
    'submit_solution',
    'submit_review',
    'submit_approved_solution'

    /* ADMIN METHODS */
    // 'new',
    // 'add_tasks',
    // 'add_taskset',
    // 'update_taskset_prices',
    // 'update_mtasks_per_second',
    // 'whitelist_account',
    // 'ban_account',
    // 'approve_solution',

    /* OTHER (defined in the original nearcrowd prototype) */
    // 'claim_reward',
    // 'return_own_review',
    // 'remove_duplicate_review',
    // 'honeypot_partial_credit',
    // 'finalize_task',
    // 'finalize_challenged_task',
    // 'challenge',
    // 'invite_friend',
    // 'list_invite',
    // 'buy_invite',
    // 'push_queue'
];

export function isAccountStateIdle(state: OnChain.AccountState): state is OnChain.AccountStateIdle {
    return typeof state === 'string' && state === 'Idle';
}

export function isAccountStateNonExistent(state: OnChain.AccountState): state is OnChain.AccountStateNonExistent {
    return typeof state === 'string' && state === 'NonExistent';
}

export function isAccountStateWaitsForAssignment(
    state: OnChain.AccountState
): state is OnChain.AccountStateWaitsForAssignment {
    return typeof state === 'object' && state.hasOwnProperty('WaitsForAssignment');
}

export function isAccountStateHasAssignment(state: OnChain.AccountState): state is OnChain.AccountStateHasAssignment {
    return typeof state === 'object' && state.hasOwnProperty('HasAssignment');
}

/**
 * NOTE: This hook should be used after wallet initialization and user authorization!
 */
export function useNearcrowdContract() {
    const wallet = useNearWallet()!;
    const accountId = wallet ? wallet.getAccountId() : '';

    const contract = useNearContract(CONTRACT_ID, {
        viewMethods: VIEW_METHODS,
        changeMethods: CHANGE_METHODS
    }) as NEARCrowdContract;

    // Wrapped methods
    const isAccountWhitelisted = useCallback(() => {
        return contract.is_account_whitelisted({
            account_id: accountId
        });
    }, [accountId, contract]);

    const getAccountStats = useCallback(() => {
        return contract.get_account_stats({
            account_id: accountId
        });
    }, [accountId, contract]);

    const getAccountState = useCallback(
        (tasksetOrdinal?: number) => {
            return contract.get_account_state({
                account_id: accountId,
                task_ordinal: tasksetOrdinal
            });
        },
        [accountId, contract]
    );

    const getCurrentTaskset = useCallback(() => {
        return contract.get_current_taskset({
            account_id: accountId
        });
    }, [accountId, contract]);

    const getCurrentAssignment = useCallback(
        (tasksetOrdinal: number) => {
            return contract.get_current_assignment({
                task_ordinal: tasksetOrdinal,
                account_id: accountId
            });
        },
        [accountId, contract]
    );

    const changeCurrentTaskset = useCallback(
        (newTasksetOrdinal: number) => {
            return contract.change_taskset({
                new_task_ord: newTasksetOrdinal
            });
        },
        [contract]
    );

    const applyForAssignment = useCallback(
        (tasksetOrdinal: number) => {
            return contract.apply_for_assignment({
                task_ordinal: tasksetOrdinal
            });
        },
        [contract]
    );

    const claimAssignment = useCallback(
        (tasksetOrdinal: number, bid: string) => {
            return contract.claim_assignment({
                task_ordinal: tasksetOrdinal,
                bid
            });
        },
        [contract]
    );

    const submitSolution = useCallback(
        (tasksetOrdinal: number, solutionData: number[]) => {
            return contract.submit_solution({
                task_ordinal: tasksetOrdinal,
                solution_data: solutionData
            });
        },
        [contract]
    );

    const submitApprovedSolution = useCallback(
        (tasksetOrdinal: number, solutionHash: number[]) => {
            return contract.submit_approved_solution({
                task_ordinal: tasksetOrdinal,
                solution_hash: solutionHash
            });
        },
        [contract]
    );

    return {
        contract,
        wallet,

        methods: {
            isAccountWhitelisted,
            getAccountStats,
            getAccountState,
            getCurrentTaskset,
            getCurrentAssignment,
            changeCurrentTaskset,
            claimAssignment,
            applyForAssignment,

            submitSolution,
            submitApprovedSolution
        }
    };
}

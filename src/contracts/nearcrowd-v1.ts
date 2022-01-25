import { NearContract } from 'react-near/core/contract';
import { useNearContract, useNearWallet } from 'react-near';
import { useCallback } from 'react';

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
    'submit_review'

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
    // 'submit_approved_solution',
    // 'honeypot_partial_credit',
    // 'finalize_task',
    // 'finalize_challenged_task',
    // 'challenge',
    // 'invite_friend',
    // 'list_invite',
    // 'buy_invite',
    // 'push_queue'
];

export interface AccountStatsOnChain {
    balance: string;
    successful: number;
    failed: number;
    pending?: number;
    invites?: number;
}

export interface TasksetStateOnChain {
    next_price: string;
    wait_time: string;
    num_unassigned: string;
    num_reviews: string;
}

export interface AssignmentOnChain {
    task_hash: number[];
    ordinal: number;
}

type AccountStateNonExistent = 'NonExistent';

type AccountStateIdle = 'Idle';

type AccountStateWaitsForAssignment = {
    WaitsForAssignment: {
        bid: string;
        time_left: string;
    };
};

type AccountStateHasAssignment = {
    HasAssignment: {
        assignment: AssignmentOnChain;
        bid: string;
        since: string;
    };
};

export type AccountStateOnChain =
    | AccountStateNonExistent
    | AccountStateIdle
    | AccountStateWaitsForAssignment
    | AccountStateHasAssignment;

export function isAccountStateIdle(state: AccountStateOnChain): state is AccountStateIdle {
    return typeof state === 'string' && state === 'Idle';
}

export function isAccountNonExistent(state: AccountStateOnChain): state is AccountStateNonExistent {
    return typeof state === 'string' && state === 'NonExistent';
}

export function isAccountStateWaitsForAssignment(state: AccountStateOnChain): state is AccountStateWaitsForAssignment {
    return typeof state === 'object' && state.hasOwnProperty('WaitsForAssignment');
}

export function isAccountStateHasAssignment(state: AccountStateOnChain): state is AccountStateHasAssignment {
    return typeof state === 'object' && state.hasOwnProperty('HasAssignment');
}

export type NEARCrowdContract = NearContract & {
    is_account_whitelisted(args: { account_id: string }): Promise<boolean>;
    is_account_banned(args: { account_id: string }): Promise<boolean>;
    get_account_stats(args: { account_id: string }): Promise<AccountStatsOnChain>;

    get_account_state(args: { account_id: string; task_ordinal?: number }): Promise<AccountStateOnChain>;

    change_taskset(args: { new_task_ord: number }): Promise<string>;
    get_taskset_state(args: { task_ordinal: number }): Promise<TasksetStateOnChain>;
    apply_for_assignment(args: { task_ordinal: number }): Promise<string>;
    claim_assignment(args: { task_ordinal: number; bid: string }): Promise<boolean>;
    get_current_assignment(args: { account_id: string; task_ordinal: number }): Promise<AssignmentOnChain | null>;
    get_current_taskset(args: { account_id: string }): Promise<number>;
};

export function useNearcrowdContract() {
    // should be used after wallet initialization
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

    return {
        contract,
        wallet,

        methods: {
            isAccountWhitelisted,
            getAccountStats,
            getAccountState,
            getCurrentTaskset,
            getCurrentAssignment
        },

        // TODO: remove this
        isAccountWhitelisted,
        getAccountStats,
        getAccountState,
        getCurrentTaskset,
        getCurrentAssignment
    };
}

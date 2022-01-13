import { NearContract } from 'react-near/core/contract';
import { useNearContract } from 'react-near';

export const CONTRACT_ID = 'nearcrowd.testnet';
export const VIEW_METHODS = [
    'is_account_whitelisted',
    'get_current_taskset',
    'get_estimated_atto_tasks_per_share',
    'get_account_state',
    'get_account_stats',
    'get_task_review_state',
    'get_taskset_state',
    'cheapest_invite',
    'can_push_queue'
];
export const CHANGE_METHODS = [
    'claim_reward',
    'change_taskset',
    'apply_for_assignment',
    'claim_assignment',
    'return_own_review',
    'remove_duplicate_review',
    'submit_approved_solution',
    'submit_solution',
    'submit_review',
    'honeypot_partial_credit',
    'finalize_task',
    'finalize_challenged_task',
    'challenge',
    'invite_friend',
    'list_invite',
    'buy_invite',
    'push_queue'
];

export interface IAccountStats {
    balance: string;
    successful: number;
    failed: number;
    pending?: number;
    invites?: number;
}

export type NEARCrowdContract = NearContract & {
    // TODO: describe all the methods of the contract

    is_account_whitelisted(args: { account_id: string }): Promise<boolean>;
    is_account_banned(args: { account_id: string }): Promise<boolean>;
    get_account_stats(args: { account_id: string }): Promise<IAccountStats>;
};

export function useNearcrowdContract() {
    return useNearContract(CONTRACT_ID, {
        viewMethods: VIEW_METHODS,
        changeMethods: CHANGE_METHODS
    }) as NEARCrowdContract;
}

import { NearContract } from 'react-near/core/contract';

/**
 * OnChain namespaces defines data structures of nearcrowd smart contract.
 */
export namespace OnChain {
    export interface AccountStats {
        balance: string;
        successful: number;
        failed: number;
        pending?: number;
        invites?: number;
    }

    export interface TasksetState {
        next_price: string;
        wait_time: string;
        num_unassigned: string;
        num_reviews: string;
    }

    export interface Assignment {
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
            assignment: OnChain.Assignment;
            bid: string;
            time_passed: string;
        };
    };

    export type AccountState =
        | AccountStateNonExistent
        | AccountStateIdle
        | AccountStateWaitsForAssignment
        | AccountStateHasAssignment;
}

export type NEARCrowdContract = NearContract & {
    is_account_whitelisted(args: { account_id: string }): Promise<boolean>;
    is_account_banned(args: { account_id: string }): Promise<boolean>;
    get_account_stats(args: { account_id: string }): Promise<OnChain.AccountStats>;
    get_account_state(args: { account_id: string; task_ordinal?: number }): Promise<OnChain.AccountState>;
    change_taskset(args: { new_task_ord: number }): Promise<string>;
    get_current_taskset(args: { account_id: string }): Promise<number>;
    get_taskset_state(args: { task_ordinal: number }): Promise<OnChain.TasksetState>;
    apply_for_assignment(args: { task_ordinal: number }): Promise<string>;
    claim_assignment(args: { task_ordinal: number; bid: string }): Promise<boolean>;
    get_current_assignment(args: { account_id: string; task_ordinal: number }): Promise<OnChain.Assignment | null>;
    submit_solution(args: { task_ordinal: number; solution_data: number[] }): Promise<void>;
    submit_approved_solution(args: { task_ordinal: number; solution_hash: number[] }): Promise<void>;
};

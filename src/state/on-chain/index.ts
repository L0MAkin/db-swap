import * as account from './account';
import * as assignment from './assignment';
import * as taskset from './taskset';

/**
 * On Chain State
 */
export const ocs = {
    ...account,
    ...assignment,
    ...taskset
};

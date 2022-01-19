import { useContext } from 'react';
import { WhitelistedContext } from '../contexts/WhitelistedContext';

export function useWhitelistedContext() {
    return useContext(WhitelistedContext);
}

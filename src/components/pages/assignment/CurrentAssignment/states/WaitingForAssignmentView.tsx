import { useCurrentTaskset } from '../../../../../hooks/useCurrentTaskset';
import { useAccountState } from '../../../../../hooks/useAccountState';
import { useCurrentAssignment } from '../../../../../hooks/useCurrentAssignment';
import { useEffect, useState } from 'react';
import { useInterval } from 'use-interval';

export function WaitingForAssignmentView() {
    const { nextBid, timeLeftToWait, fetchAccountState } = useAccountState(true);
    const { claimAssignment, fetchCurrentAssignment } = useCurrentAssignment(false);
    const { currentTaskset } = useCurrentTaskset(false);

    const [loading, setLoading] = useState(false);
    const [secondsToWait, setSecondsToWait] = useState(-1);

    async function claimAndFetchCurrentAssignment() {
        if (!currentTaskset || !nextBid || secondsToWait > 0) {
            return;
        }

        setLoading(true);
        await claimAssignment(currentTaskset.id, nextBid);
        await fetchAccountState();
        await fetchCurrentAssignment();
        setLoading(false);
    }

    useEffect(() => {
        if (timeLeftToWait !== null) {
            setSecondsToWait(Math.ceil(timeLeftToWait));
        }
    }, [timeLeftToWait]);

    useInterval(() => {
        if (secondsToWait > 0) {
            setSecondsToWait(secondsToWait - 1);
        }
    }, 1000);

    useEffect(() => {
        if (secondsToWait === 0) {
            claimAndFetchCurrentAssignment().catch(console.error);
        }
    }, [secondsToWait]);

    return <div>Waiting for assignment... Claim after {secondsToWait} seconds.</div>;
}

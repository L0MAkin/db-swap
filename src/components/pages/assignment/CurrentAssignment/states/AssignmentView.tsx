import { useState } from 'react';
import { toast } from 'react-toastify';
import SolutionBox from '../../SolutionBox';
import { useNearcrowdContract } from '../../../../../contracts/nearcrowd/useNearcrowdContract';
import { useCurrentTaskset } from '../../../../../hooks/useCurrentTaskset';
import { useAccountState } from '../../../../../hooks/useAccountState';
import { useCurrentAssignment } from '../../../../../hooks/useCurrentAssignment';

export function AssignmentView() {
    const { currentTaskset, requestChangeCurrentTaskset } = useCurrentTaskset(true);
    const { fetchAccountState, timePassedSinceAssignment } = useAccountState(true);
    const { currentAssignment } = useCurrentAssignment(true);

    const { methods } = useNearcrowdContract();
    const [solutionSubmitted, setSolutionSubmitted] = useState(false);

    if (!currentAssignment) {
        return <div>Loading assignment...</div>;
    }

    const { content, forReview } = currentAssignment;

    async function submitSolution(solution: object) {
        if (timePassedSinceAssignment !== null && timePassedSinceAssignment < 2 * 60) {
            toast.warn('You spend to little time creating solutions 🤔');
            return;
        }

        const toastId = toast.loading('Submitting solutions...', { type: 'info' });

        const solutionData = '12345123451234512345123451234500'.split('').map(Number);
        await methods.submitSolution(currentTaskset!.id, solutionData).catch(console.error);

        toast.update(toastId, { render: 'Your solutions submitted!', type: 'success', isLoading: false, delay: 500 });
        setSolutionSubmitted(true);

        // NOTE: call change_taskset with current taskset ordinal to force "Idle" state
        await requestChangeCurrentTaskset(currentTaskset!.id).catch(console.error);
        await fetchAccountState().catch(console.error);
    }

    if (solutionSubmitted) {
        return <div>Solution submitted...</div>;
    }

    return (
        <SolutionBox
            assignmentMetadata={content}
            forReview={forReview}
            onSolutionSubmit={submitSolution}
            onSolutionChange={(solution) => {
                console.log('solutions changed:', solution);
            }}
        />
    );
}

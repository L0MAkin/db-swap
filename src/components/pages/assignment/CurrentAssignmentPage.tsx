import PageLayout from '../../layout/PageLayout';
import { useEffect, useState } from 'react';
import { useAccountState } from '../../../hooks/useAccountState';
import { useCurrentTaskset } from '../../../hooks/useCurrentTaskset';
import CustomButton from '../../shared/CustomButton';
import { Link } from 'react-router-dom';
import { useCurrentAssignment } from '../../../hooks/useCurrentAssignment';
import SolutionBox from './SolutionBox';
import { useNearcrowdContract } from '../../../contracts/nearcrowd/useNearcrowdContract';
import { toast } from 'react-toastify';

function CurrentAssignmentPage() {
    const { isAccountState, nextBid, fetchAccountState } = useAccountState(true);
    const { currentTaskset, requestChangeCurrentTaskset } = useCurrentTaskset(true);
    const { currentAssignment, claimAssignment, applyForAssignment, fetchCurrentAssignment } =
        useCurrentAssignment(true);

    const [loading, setLoading] = useState<boolean>(false);

    async function claimAndFetchCurrentAssignment() {
        if (!currentTaskset || !nextBid) {
            return;
        }

        await claimAssignment(currentTaskset.id, nextBid);
        await fetchAccountState();
        await fetchCurrentAssignment();
    }

    useEffect(() => {
        if (isAccountState?.waitsForAssignment) {
            claimAndFetchCurrentAssignment().catch(console.error);
        }
    }, [isAccountState]);

    // components
    function SelectTasksetMessage() {
        return (
            <div>
                Please select{' '}
                <Link to="/tasksets" className="text-yellow-300">
                    taskset
                </Link>{' '}
                before applying for assignment.
            </div>
        );
    }

    function ApplyForAssignment() {
        const [loadingApply, setLoadingApply] = useState(false);

        if (!currentTaskset) {
            return <div>Loading taskset...</div>;
        }

        async function onClick() {
            console.log('call apply_for_assignment');
            setLoadingApply(true);
            await applyForAssignment(currentTaskset!.id).catch(console.error);
            await fetchAccountState();
            setLoadingApply(false);
        }

        return (
            <div className="flex flex-col justify-center space-y-5">
                <p>Taskset: {currentTaskset.title}. No assigned tasks.</p>
                <CustomButton
                    disabled={loadingApply}
                    className="bg-blue-500 disabled:opacity-50 disabled:cursor-wait"
                    onClick={() => {
                        onClick();
                    }}
                >
                    Apply for assignment
                </CustomButton>
            </div>
        );
    }

    const { methods } = useNearcrowdContract();
    function Assignment() {
        const [solutionSubmitted, setSolutionSubmitted] = useState(false);

        if (!currentAssignment) {
            return <div>Loading assignment...</div>;
        }

        const { contents, forReview } = currentAssignment;

        async function submitSolution(solution: object) {
            const toastId = toast.loading('Submitting solution...', { type: 'info' });

            const solutionData = '12345123451234512345123451234500'.split('').map(Number);
            await methods.submitSolution(currentTaskset!.id, solutionData).catch(console.error);

            toast.update(toastId, { render: 'Your solution submitted!', type: 'success', delay: 5000 });
            setSolutionSubmitted(true);

            // NOTE: call change_taskset with current taskset ordinal to force "Idle" state
            await requestChangeCurrentTaskset(currentTaskset!.id).catch(console.error);
            await fetchAccountState().catch(console.error);
        }

        if (solutionSubmitted) {
            return <div>...</div>;
        }

        return (
            <SolutionBox
                assignmentMetadata={contents}
                forReview={forReview}
                onSolutionChange={(solution) => {
                    // console.log('New solution object', solution);
                }}
                onSolutionSubmit={submitSolution}
            />
        );
    }

    function Content() {
        return (
            <div className="flex flex-col items-center shadow bg-white rounded p-3">
                {isAccountState === null && <div>...</div>}
                {isAccountState?.nonExistent && <SelectTasksetMessage />}
                {isAccountState?.idle && <ApplyForAssignment />}
                {isAccountState?.waitsForAssignment && <div>Waiting for assignment...</div>}
                {isAccountState?.hasAssignment && <Assignment />}
            </div>
        );
    }

    function Loader() {
        return <div>Loading...</div>;
    }

    return <PageLayout>{loading ? <Loader /> : <Content />}</PageLayout>;
}

export default CurrentAssignmentPage;

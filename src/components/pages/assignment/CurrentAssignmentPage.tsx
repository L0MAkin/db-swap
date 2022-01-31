import PageLayout from '../../layout/PageLayout';
import { useEffect, useState } from 'react';
import { useAccountState } from '../../../hooks/useAccountState';
import { useCurrentTaskset } from '../../../hooks/useCurrentTaskset';
import CustomButton from '../../shared/CustomButton';
import { Link } from 'react-router-dom';
import { useCurrentAssignment } from '../../../hooks/useCurrentAssignment';
import SolutionBox from './SolutionBox';
import { useNearcrowdContract } from '../../../contracts/nearcrowd/useNearcrowdContract';

function CurrentAssignmentPage() {
    const { isAccountState, nextBid, fetchAccountState } = useAccountState(true);
    const { currentTaskset } = useCurrentTaskset(true);
    const { currentAssignment, claimAssignment, applyForAssignment } = useCurrentAssignment(true);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!isAccountState) return;

        if (isAccountState.waitsForAssignment) {
            if (currentTaskset && nextBid) {
                console.log('call claim_assignment');
                // claimAssignment(currentTaskset.id, nextBid).catch(console.error);
            }
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
        if (!currentAssignment) {
            return <div>Loading assignment...</div>;
        }

        const { contents, forReview } = currentAssignment;

        return (
            <SolutionBox
                assignmentMetadata={contents}
                forReview={forReview}
                onSolutionChange={(solution) => {
                    // console.log('New solution object', solution);
                }}
                onSolutionSubmit={(solution) => {
                    // TODO: refactor
                    console.log('Submit solution', solution);
                    const solutionData = '12345123451234512345123451234500'.split('').map(Number);

                    methods
                        .submitSolution(currentTaskset!.id, solutionData)
                        .then((result) => {
                            console.log('successfully submitted solution', result);
                        })
                        .catch(console.error);
                }}
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

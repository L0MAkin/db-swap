import PageLayout from '../../layout/PageLayout';
import { useEffect, useState } from 'react';
import { useAccountState } from '../../../hooks/useAccountState';
import { useCurrentTaskset } from '../../../hooks/useCurrentTaskset';
import CustomButton from '../../shared/CustomButton';
import { Link } from 'react-router-dom';
import { useCurrentAssignment } from '../../../hooks/useCurrentAssignment';

function CurrentAssignmentPage() {
    const { isAccountState } = useAccountState(true);
    const { currentTaskset } = useCurrentTaskset(true);
    const { currentAssignment } = useCurrentAssignment(true);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!isAccountState) return;

        if (isAccountState.hasAssignment) {
            // fetchCurrentTask().catch(console.error);
        } else if (isAccountState.waitsForAssignment) {
            console.log('TODO: call claim_assignment');
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
        return (
            <div>
                <p>Selected taskset: {currentTaskset?.title}</p>
                <CustomButton>Apply for assignment</CustomButton>
            </div>
        );
    }

    function Assignment() {
        return <div>{currentAssignment && <code>{currentAssignment.contents}</code>}</div>;
    }

    function Content() {
        return (
            <div className="flex flex-col items-center outline rounded p-3">
                {isAccountState === null && <div>...</div>}
                {isAccountState?.nonExistent && <SelectTasksetMessage />}
                {isAccountState?.idle && <ApplyForAssignment />}
                {isAccountState?.waitsForAssignment && <div>Claiming & Fetching task...</div>}
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

import PageLayout from '../../../layout/PageLayout';
import { useState } from 'react';
import { useAccountState } from '../../../../hooks/useAccountState';
import { useCurrentTaskset } from '../../../../hooks/useCurrentTaskset';
import { useCurrentAssignment } from '../../../../hooks/useCurrentAssignment';
import { TasksetNotSelectedView } from './states/TasksetNotSelectedView';
import { WaitingForAssignmentView } from './states/WaitingForAssignmentView';
import { ApplyForAssignmentView } from './states/ApplyForAssignmentView';
import { AssignmentView } from './states/AssignmentView';

function Loader() {
    return <div>Loading...</div>;
}

function CurrentAssignmentPage() {
    const { isAccountState } = useAccountState(true);
    const {} = useCurrentTaskset(true);
    const {} = useCurrentAssignment(true);

    const [loading, setLoading] = useState<boolean>(false);

    if (loading || !isAccountState) {
        return <Loader />;
    }

    return (
        <PageLayout>
            <div className="flex flex-col items-center shadow bg-white rounded p-3">
                {isAccountState.nonExistent && <TasksetNotSelectedView />}
                {isAccountState.idle && <ApplyForAssignmentView />}
                {isAccountState.waitsForAssignment && <WaitingForAssignmentView />}
                {isAccountState.hasAssignment && <AssignmentView />}
            </div>
        </PageLayout>
    );
}

export default CurrentAssignmentPage;

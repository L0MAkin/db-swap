import PageLayout from '../../layout/PageLayout';
import { useCallback, useEffect, useState } from 'react';
import { useAccountState } from '../../../hooks/useAccountState';
import { useCurrentTaskset } from '../../../hooks/useCurrentTaskset';
import CustomButton from '../../shared/CustomButton';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import { atom, useRecoilState } from 'recoil';
import { TaskDTO } from '../../../services/api/tasks';

export const currentTaskAtom = atom<TaskDTO | null>({
    key: 'currentTaskAtom',
    default: null
});

function AssignmentPage() {
    const { currentTaskset } = useCurrentTaskset(true);
    const { assignmentHash, isAccountState } = useAccountState(true);
    // todo: useCurrentAssignment
    const [currentTask, setCurrentTask] = useRecoilState(currentTaskAtom);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchCurrentTask = useCallback(async () => {
        if (!assignmentHash) return;

        const task = await api.tasks.fetchTask(assignmentHash);

        setCurrentTask(task);
    }, [assignmentHash]);

    useEffect(() => {
        if (isAccountState?.hasAssignment) {
            fetchCurrentTask().catch(console.error);
        }

        if (isAccountState?.waitsForAssignment) {
            console.log('claiming task');
        }
    }, [isAccountState]);

    console.log({ currentTaskset, isAccountState });

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
        return (
            <div>
                <code>{JSON.stringify(currentTask)}</code>
            </div>
        );
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

export default AssignmentPage;

import PageLayout from '../components/layout/PageLayout';
import { useCallback, useEffect, useState } from 'react';
import { useAccountState } from '../hooks/useAccountState';
import { useCurrentTaskset } from '../hooks/useCurrentTaskset';
import CustomButton from '../components/shared/CustomButton';
import { Link } from 'react-router-dom';
import { fetchTask } from '../services/tasks';
import { useRecoilState } from 'recoil';
import { currentTaskAtom } from '../state/task';

//  if (has assignment)
//      fetch current task and show it
//  if (waits for assignment)
//      show [claim assignment] button
//  if (idle)
//      show [apply for assignment] button
//  if (non existent)
//

function AssignmentPage() {
    const { currentTaskset, fetchCurrentTaskset } = useCurrentTaskset();
    const { taskHash, accountStateEnum, fetchAccountState } = useAccountState();

    const [loading, setLoading] = useState<boolean>(false);
    const [currnetTask, setCurrentTask] = useRecoilState(currentTaskAtom);
    // const { currentTask, fetchCurrentTask } = useTask();

    useEffect(() => {
        fetchCurrentTaskset().catch(console.error);
    }, []);

    useEffect(() => {
        if (currentTaskset) {
            fetchAccountState(currentTaskset.id).catch(console.error);
        }
    }, [currentTaskset]);

    const fetchCurrentTask = useCallback(async () => {
        if (!taskHash) return;

        const task = await fetchTask(taskHash);

        setCurrentTask(task);
    }, [taskHash]);

    useEffect(() => {
        if (accountStateEnum === 'TaskAssigned') {
            fetchCurrentTask().catch(console.error);
        }

        if (accountStateEnum === 'WaitingForTaskAssignment') {
            console.log('claiming task');
        }
    }, [accountStateEnum]);

    console.log({ accountStateEnum, currentTaskset });

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
                <code>{JSON.stringify(currnetTask)}</code>s
            </div>
        );
    }

    function Content() {
        return (
            <div className="flex flex-col items-center outline rounded p-3">
                {accountStateEnum === 'TasksetNotSelected' && <SelectTasksetMessage />}
                {accountStateEnum === 'TasksetSelected' && <ApplyForAssignment />}
                {accountStateEnum === 'WaitingForTaskAssignment' && <div>Claiming & Fetching task...</div>}
                {accountStateEnum === 'TaskAssigned' && <Assignment />}
            </div>
        );
    }

    function Loader() {
        return <div>Loading...</div>;
    }

    return <PageLayout>{loading ? <Loader /> : <Content />}</PageLayout>;
}

export default AssignmentPage;

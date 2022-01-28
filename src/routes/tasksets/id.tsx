import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
    isAccountStateHasAssignment,
    isAccountStateIdle,
    isAccountStateWaitsForAssignment,
    useNearcrowdContract
} from '../../contracts/nearcrowd-v1';
import { fetchTopic, TopicDTO } from '../../services/topics';
import PageLayout from '../../components/layout/PageLayout';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTasksetState } from '../../state/taskset';
import CustomButton from '../../components/shared/CustomButton';
import { ocs } from '../../state/on-chain';
import { Link } from 'react-router-dom';

const LoadingTasksetMessage = () => (
    <div className="flex flex-row items-center">
        <span>Selecting taskset... </span>
        <div
            className="
                w-5 h-5 border-4 border-solid
                border-yellow-600 border-t-transparent
                rounded-full animate-spin"
        />
    </div>
);

// --- logic ---
// 1. fetch taskset api data
// 2. fetch current taskset on-chain data
// 3.
//      if (taskset from api === taskset on-chain)
//          if (already has and assigment)
//              display [go to assigment] button
//          else
//              display [apply for assigment] button
//      else
//          display [change taskset] button

const ChangeTasksetButton = () => (
    <CustomButton onClick={() => console.log('change taskset')}>Change Taskset</CustomButton>
);

function isTasksetIdValid(id: number | string | undefined) {
    return !Number.isNaN(Number(id)) && Number(id) >= 0;
}

function TasksetPage() {
    const { id } = useParams();
    const { methods } = useNearcrowdContract();

    const [taskset, setTaskset] = useState<TopicDTO | null>();
    const [currentTaskset, setCurrentTaskset] = useRecoilState(currentTasksetState);

    const isIdParamValid = isTasksetIdValid(id);
    const isTasksetMatchedWithOnChain = isIdParamValid && Number(id) === currentTaskset?.id;
    const accountStateEnum = useRecoilValue(ocs.accountStateEnumSelector);

    const fetchTasksetData = useCallback(async () => {
        if (!isTasksetIdValid) return;

        const data = await fetchTopic(Number(id));

        if (data) {
            setTaskset(data);
        }
    }, [isIdParamValid]);

    const fetchCurrentTasksetData = useCallback(async () => {
        const ordinal = await methods.getCurrentTaskset();
        const data = await fetchTopic(ordinal);

        if (data) {
            setCurrentTaskset(data);
        }
    }, [methods]);

    const changeTaskset = useCallback(async () => {
        if (!taskset) return;

        await methods.changeCurrentTaskset(taskset.id);
    }, [taskset, methods]);

    const getAccountStateForCurrentTaskset = useCallback(async () => {
        const data = await methods.getAccountState(currentTaskset?.id);

        console.log({ data });
        // setAccountState(data);
    }, [currentTaskset]);

    useEffect(() => {
        // fetch taskset from api and blockchain once
        fetchTasksetData().catch(console.error);
        fetchCurrentTasksetData().catch(console.error);

        return () => {
            // cleanup
            setTaskset(null);
        };
    }, [id]);

    useEffect(() => {
        if (currentTaskset) {
            getAccountStateForCurrentTaskset().catch(console.error);
        }
    }, [currentTaskset]);

    return (
        <PageLayout>
            <div className="flex flex-col items-center">
                <div className="text-xl font-medium mb-4">{taskset?.title}</div>

                {accountStateEnum === 'TaskAssigned' && !isTasksetMatchedWithOnChain && (
                    <div>
                        You have a running assignment for a
                        <Link to={`/tasksets/${currentTaskset?.id}`} className="text-yellow-300">
                            {' '}
                            different
                        </Link>{' '}
                        taskset.
                    </div>
                )}

                {accountStateEnum === 'TaskAssigned' && isTasksetMatchedWithOnChain && (
                    <div>
                        <span>You have a running </span>
                        <Link to="/assignment" className="text-yellow-300">
                            assignment
                        </Link>{' '}
                        <span>for this taskset.</span>
                    </div>
                )}

                {!isTasksetMatchedWithOnChain && <ChangeTasksetButton />}
            </div>
        </PageLayout>
    );
}

export default TasksetPage;

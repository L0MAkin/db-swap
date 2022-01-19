import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNearWallet } from 'react-near';
import * as nearcrowdv1 from '../../contracts/nearcrowd-v1';
import { useNearcrowdContract } from '../../contracts/nearcrowd-v1';
import { fetchTaskset, Taskset } from '../../services/tasksets';
import PageLayout from '../../components/layouts/PageLayout';
import CustomButton from '../../components/shared/CustomButton';

function TasksetPage() {
    const params = useParams();
    const [taskset, setTaskset] = useState<Taskset>();

    const { tasksetId } = params;

    const wallet = useNearWallet()!;
    const contract = useNearcrowdContract();

    const [accountState, setAccountState] =
        useState<nearcrowdv1.AccountState>();

    const [applied, setApplied] = useState<boolean>(false);
    async function callApplyForAssignment() {
        if (!taskset) return;

        const result = await contract.apply_for_assignment({
            task_ordinal: taskset.ordinal
        });

        console.log('apply_for_assignment', { result });
        setApplied(result);
    }

    useEffect(() => {
        async function callGetAccountState(
            tasksetOrdinal: number,
            accountId: string
        ) {
            const result = await contract.get_account_state({
                account_id: accountId,
                task_ordinal: tasksetOrdinal
            });

            setAccountState(result);
        }

        async function callChangeTaskset(tasksetOrdinal: number) {
            const result = await contract.change_taskset({
                new_task_ord: tasksetOrdinal
            });
            console.log('change_taskset', { result });
        }

        async function fetchTasksetData() {
            const data = await fetchTaskset(tasksetId!);

            if (data) {
                setTaskset(data);
                // await callChangeTaskset(data.ordinal);
                // await callGetAccountState(
                //     data.ordinal,
                //     wallet.account().accountId
                // );
            }
        }

        if (tasksetId) {
            fetchTasksetData();
        }

        return () => {
            // cleanup
            setTaskset(undefined);
        };
    }, []);

    return (
        <PageLayout>
            <div className="flex flex-col items-center">
                <h1 className="text-l">{taskset?.name}</h1>

                <div>Accaount state: {accountState}</div>

                {taskset && (
                    <CustomButton
                        className="my-20"
                        onClick={callApplyForAssignment}
                    >
                        Apply for assignment
                    </CustomButton>
                )}
            </div>
        </PageLayout>
    );
}

export default TasksetPage;

import PageLayout from '../../layouts/PageLayout';
import { useEffect, useState } from 'react';
import { fetchTaskset, Taskset } from './tasksets';
import { useParams } from 'react-router';
import CustomButton from '../../components/CustomButton';

function TasksetPage() {
    const params = useParams();
    const [taskset, setTaskset] = useState<Taskset>();

    const { tasksetId } = params;

    useEffect(() => {
        async function fetchTasksetData() {
            const data = await fetchTaskset(tasksetId!);

            setTaskset(data);
        }

        if (tasksetId) {
            fetchTasksetData();
        }
    });

    return (
        <PageLayout withAuth>
            <div className="flex flex-col items-center">
                <h1 className="text-l">{taskset?.name}</h1>

                <CustomButton className="my-20">
                    Apply for assignment
                </CustomButton>
            </div>
        </PageLayout>
    );
}

export default TasksetPage;

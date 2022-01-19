import PageLayout from '../../layouts/PageLayout';
import { useEffect, useState } from 'react';
import TasksetCard from './TasksetCard';
import { fetchTasksetList, Taskset } from './tasksets';

function TasksetSelectionPage() {
    const [tasksetList, setTasksetList] = useState<Taskset[]>([]);

    useEffect(() => {
        async function fetchTasksetsData() {
            const list = await fetchTasksetList();

            setTasksetList(list);
        }

        fetchTasksetsData();
    });

    return (
        <PageLayout>
            <h1 className="text-4xl mb-5 font-medium">Select task-set</h1>

            <div className="flex flex-col gap-5">
                {tasksetList.map((taskset) => {
                    return <TasksetCard key={taskset.id} taskset={taskset} />;
                })}
            </div>
        </PageLayout>
    );
}

export default TasksetSelectionPage;

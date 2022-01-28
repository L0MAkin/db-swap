import Card from './Card';
import PageLayout from '../../layout/PageLayout';
import { useCurrentTaskset } from '../../../hooks/useCurrentTaskset';
import { useTasksets } from '../../../hooks/useTasksets';

function TasksetListPage() {
    const { tasksetList } = useTasksets(true);
    const { currentTaskset } = useCurrentTaskset(true);

    return (
        <PageLayout>
            <h1 className="text-4xl mb-5 font-medium">Select task-set</h1>

            <div className="flex flex-col gap-5">
                {(tasksetList || []).map((taskset) => {
                    const selected = taskset.id === currentTaskset?.id;

                    return <Card key={taskset.id} taskset={taskset} selected={selected} />;
                })}
            </div>
        </PageLayout>
    );
}

export default TasksetListPage;

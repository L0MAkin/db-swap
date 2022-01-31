import Card from './Card';
import PageLayout from '../../layout/PageLayout';
import { useCurrentTaskset } from '../../../hooks/useCurrentTaskset';
import { useTasksets } from '../../../hooks/useTasksets';

function TasksetListPage() {
    const { tasksetList } = useTasksets(true);
    const { currentTaskset, requestChangeCurrentTaskset, fetchCurrentTaskset } = useCurrentTaskset(true);

    const list = tasksetList || [];

    return (
        <PageLayout>
            <div className="flex flex-col gap-5">
                {list.map((taskset) => {
                    const selected = taskset.id === currentTaskset?.id;

                    async function onSelect() {
                        await requestChangeCurrentTaskset(taskset.id);
                        await fetchCurrentTaskset();
                    }

                    return <Card key={taskset.id} taskset={taskset} selected={selected} onSelect={onSelect} />;
                })}
            </div>
        </PageLayout>
    );
}

export default TasksetListPage;

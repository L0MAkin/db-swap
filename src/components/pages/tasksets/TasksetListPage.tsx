import Card from './Card';
import PageLayout from '../../layout/PageLayout';
import { useCurrentTaskset } from '../../../hooks/useCurrentTaskset';
import { useTasksets } from '../../../hooks/useTasksets';
import { useAccountState } from '../../../hooks/useAccountState';
import { toast } from 'react-toastify';

function TasksetListPage() {
    const { tasksetList } = useTasksets(true);
    const { fetchAccountState, isAccountState } = useAccountState(true);
    const { currentTaskset, requestChangeCurrentTaskset, fetchCurrentTaskset } = useCurrentTaskset(true);

    const list = tasksetList || [];

    const notifyUnableChangeTaskset = () =>
        toast.warn('You already have and assignment from a different taskset.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

    return (
        <PageLayout>
            <div className="flex flex-col gap-5">
                {list.map((taskset) => {
                    const selected = taskset.id === currentTaskset?.id;

                    async function onSelect() {
                        if (isAccountState?.hasAssignment) {
                            notifyUnableChangeTaskset();
                            return;
                        }

                        await requestChangeCurrentTaskset(taskset.id);
                        await fetchCurrentTaskset();
                        await fetchAccountState();
                    }

                    return <Card key={taskset.id} taskset={taskset} selected={selected} onSelect={onSelect} />;
                })}
            </div>
        </PageLayout>
    );
}

export default TasksetListPage;

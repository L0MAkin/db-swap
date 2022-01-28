import { FC, useState } from 'react';
import { TopicDTO } from '../../../services/api/topics';
import { useTasksets } from '../../../hooks/useTasksets';

const Card: FC<{ taskset: TopicDTO; selected?: boolean }> = ({ taskset, selected }) => {
    const { requestChangeTaskset } = useTasksets();

    const [loading, setLoading] = useState<boolean>(false);

    async function onClick() {
        setLoading(true);
        await requestChangeTaskset(taskset.id);
        setLoading(false);
    }

    return (
        <div
            className={
                `flex flex-col justify-between
                bg-white rounded border shadow-md leading-normal p-4
                hover:shadow-lg hover:scale-105 transition ease-out ` + (selected && ' border-green-500')
            }
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{taskset.title}</h5>
            <p className="mb-3 font-normal italic">{taskset.description}</p>

            <button
                type="button"
                className="py-2 px-3 rounded bg-yellow-400 font-medium"
                disabled={loading}
                onClick={() => {
                    onClick().catch(console.error);
                }}
            >
                Select
            </button>
        </div>
    );
};

export default Card;

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Taskset } from '../../services/tasksets';

const TasksetCard: FC<{ taskset: Taskset }> = ({ taskset }) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col justify-between
                bg-white rounded border shadow-md leading-normal p-4 cursor-pointer
                hover:shadow-lg hover:scale-105 transition ease-out"
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {taskset.name}
            </h5>
            <p className="mb-3 font-normal">{taskset.description}</p>
            <p className="mb-3 font-normal italic">
                Requirements: {taskset.requirements}
            </p>

            <button
                type="button"
                className="py-2 px-3 rounded bg-yellow-400 font-medium"
                onClick={() => {
                    navigate(`/tasksets/${taskset.id}`);
                }}
            >
                choose
            </button>
        </div>
    );
};

export default TasksetCard;
